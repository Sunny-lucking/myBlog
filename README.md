@[TOC](项目优化记录)

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
