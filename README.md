@[TOC](项目优化记录)

## 优化打包体积

  将vue，elementui，axios，采用cdn的方式引入，体积从9m多变成5m多，打包时设置不生成map文件，体积变成1.7m
 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084229287.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084410405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk2NDE0OA==,size_16,color_FFFFFF,t_70)
对应的首屏加载的时间也从
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084630331.png)
变成![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407084651542.png)
