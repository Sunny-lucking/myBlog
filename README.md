@[TOC](项目优化记录)
# 性能提升
## 1. 首屏加载提升方案
1. 对于vue，elementui这些框架采用**CDN**的方式引入项目，使得项目的体积缩小，优化了首屏加载。
2. 对于axios，router这些库也采用**CDN**方式引入。
3. 资源压缩,其中**关闭sourcemap**，包的体积减少将近一半，sourcemap是为了方便线上调试用的，因为线上代码都是压缩过的，导致调试极为不便，而有了sourcemap，就等于加了个索引字典，出了问题可以定位到源代码的位置。 但是，这个玩意是每个js都带一个sourcemap，有时sourcemap会很大，拖累了整个项目加载速度，为了节省加载时间，我们将其关闭掉。就这一句话就可以关闭sourcemap了，很简单。
![](https://imgkr.cn-bj.ufileos.com/6196fefa-5136-4bb1-bfa4-9859f81316a7.png)
4. 使用**gzip压缩**，文件体积缩小，优化了首屏加载。
5. 首页实现**下拉加载**更多，避免第一次加载数据过多，从而提升首屏渲染。
6. 图片启用懒加载模式。位于不可见区域不展示
7. 把一些非首屏的组件设计成异步组件，部分不影响初次视觉体验的组件也可以设计为异步组件。即组件的按需加载
## 2.使用过程的性能提升方案
1. 缓存方面，对于js和css采用了**强缓存**的缓存方式，时间为1年。对于html，以及数据库数据采用**协商缓存**方式，方便了数据的更新。
2. 防抖方面，搜索框采用了**防抖策略**，因而用户若还在输入中，则会取消之前的请求。
3. 节流方面，首页列表下拉加载采用**节流策略**，防止用户因一次性多次下拉导致多次加载。


**简单节流函数展示**
```js
// 节流函数
export function throttle(fn){
    let timer = null;
    return function () {
        if (!timer){
            timer = setTimeout(function () {
                fn();
                timer = null;
            },3000)
        }
    }
}
```

**简单防抖函数展示**
```js
// 防抖函数
export function deBounce () {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}
```


# 首页功能
**首页总体预览**

![](https://imgkr.cn-bj.ufileos.com/da320717-6bbc-4775-8317-fe496ce1d0e7.png)

![](https://imgkr.cn-bj.ufileos.com/aada9a58-081c-44ac-9179-698750bfcf1f.png)

## 1.最新列表的展示

**1.1 结合节流函数实现下拉加载更多内容**

![](https://imgkr.cn-bj.ufileos.com/debf9db9-fb21-42c4-9dff-deb7a787e260.png)

```js  
 window.addEventListener('scroll',function () {
    if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        getMoreLatestThrottle();
    }
})
```

**1.2 结合Elementui实现图片懒加载模式**

![](https://imgkr.cn-bj.ufileos.com/f0f9585e-decd-4123-9f66-a2b60435e165.png)


```js
 <el-image
    lazy

    :src="imgUrlFormat(item.cover)"
    fit="cover"></el-image>
```
# 文章详情页功能
**总体展示**
![](https://imgkr.cn-bj.ufileos.com/9b5115bc-dcfc-4a9b-888e-2ddd7d990c34.png)

![](https://imgkr.cn-bj.ufileos.com/097c40e8-fbfc-4ace-97f0-cc46aa1c8a03.png)

![](https://imgkr.cn-bj.ufileos.com/c3b9ee18-99a1-4a45-af79-52301690c1c3.png)

![](https://imgkr.cn-bj.ufileos.com/146360e9-3837-40a7-bdd5-bed73ee01254.png)


## 优化打包体积

  将vue，elementui，axios，采用cdn的方式引入，体积从9m多变成5m多，打包时设置不生成map文件，体积变成1.7m
 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084229287.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084410405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk2NDE0OA==,size_16,color_FFFFFF,t_70)
对应的首屏加载的时间也从
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084630331.png)
变成![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084651542.png)


使用gzip压缩，首屏渲染从10s左右降低到5s左右


将静态资源设置为强缓存，时间为1年
```js
app.use(express.static(path.join(config.publicPath, 'dist'), { maxAge: 60 * 1000 * 60 * 24 * 365 }))
```

### 用户体验提升

- 搜索框实现搜索联想-采用防抖提升性能

```js
watch:{
    keyWord(val){
        if (val){
            this.deBounce(this.getSearchListBykeyWord,1000)
        }else{
            this.searchList = []
        }

    },
}

onClickOfSearchItem(searchItem){
    this.keyWord =  searchItem
    this.$nextTick(()=>{
        this.searchList = []
    })
},
async getSearchListBykeyWord(){
    let {status,data:{titleList}} = await this.$http.get(encodeURI(BASE_URL+'/api/article/getTitleListByKeyWord?keyWord='+this.keyWord))
    console.log(titleList);
    this.searchList = titleList
},
// 防抖函数
deBounce: (function () {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };

})()
},
```
