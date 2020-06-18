<template>
  <div class="home">
    <div class="content">
        <h1>Written? Kitten!</h1>
        <div class="writeBox">
          <textarea ref="setFontFamily" name="" id="" cols="90" rows="35" v-model="inputValue"></textarea>
          <!--<img :src="imgs[imgIndex].imgUrl2" alt="" width="510" height="535">-->
          <el-image
                  style="width: 510px;height: 535px;margin-left: 10px"
                  :src="imgs[imgIndex].imgUrl2"
                  fit="cover"></el-image>
          <!--<el-tag>标签一</el-tag>-->
          <!--<el-tag type="success">标签二</el-tag>-->
          <!--<el-button @click="visible = true">Button</el-button>-->
          <!--<el-button @click="visible = true">Button</el-button>-->
          <!--<el-button @click="visible = true">Button</el-button>-->
          <div class="someSet">
            <span class="someSet-children">每多少字：</span>
            <select class="someSet-children" v-model="wordCountSelect" @change="changeWordCountSelect">
              <option value ="50">50</option>
              <option value ="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
            <span class="someSet-children" >字体：</span>
            <select class="someSet-children" v-model="fontFamily">
              <!--<option value ="Impact,Charcoal,sans-serif">微软雅黑</option>-->
              <option value ="SimSun">宋体</option>
              <option value="KaiTi">隶书</option>
              <option value="NSimSun">篆书</option>
            </select>
            <span class="someSet-children" >字体大小：</span>
            <input type="number" width="10" min="10" v-model="fontSize">
            <span class="someSet-children" >当前字数：{{wordCount}}</span>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
    data(){
      return{
          inputValue:'',
          fontFamily:"SimSun",
          fontSize:16,
          wordCountSelect:50,
          imgs:[
              {imgUrl2: require( "./image/nala1.jpg")},
              {imgUrl2: require( "./image/nala2.jpg")},
              {imgUrl2: require( "./image/nala3.jpg")},
              {imgUrl2: require( "./image/nala4.jpg")},
              {imgUrl2: require( "./image/nala5.jpg")},
              {imgUrl2: require( "./image/nala6.jpg")},
              {imgUrl2: require( "./image/nala7.jpg")},
              {imgUrl2: require( "./image/nala8.jpg")},
              {imgUrl2: require( "./image/nala9.jpg")},
              {imgUrl2: require( "./image/nala10.jpg")},
              // {imgUrl2: require( "./../../public/image/nala11.jpg")},
          ],
          imgIndex:0
      }
    },
    computed:{
        wordCount(){
            return this.inputValue.length;
        }
    },
    mounted(){
        // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
        // window.onbeforeunload = function (e) {
        //     window.localStorage.setItem("inputStore",this.inputValue);
        //
        // };
        this.onbeforeload();
    },
    methods:{
        changeWordCountSelect(){
            // console.log(this.wordCountSelect);
            alert("sadas");
        },
        //页面打开时
        onbeforeload(){
            this.inputValue=window.localStorage.getItem("inputStore");
        }
    },
    watch:{
        //监听输入内容
        inputValue(){
            //当字数增加50时，托i按索引index+1;
            console.log(this.wordCountSelect);
            console.log(this.wordCount);
            // console.log(this);
            this.imgIndex=Math.floor(this.wordCount/this.wordCountSelect%10);
            console.log(this.imgIndex);
            window.localStorage.setItem("inputStore",this.inputValue);


            // alert(0);
              // if (this.imgIndex>4){
              //     this.imgIndex=1;
              // }
        },
        //监听改变字体样式
        fontFamily(){
            this.$refs.setFontFamily.style.fontFamily=this.fontFamily;
        },
        //监听改变字体大小
        fontSize(){
            this.$refs.setFontFamily.style.fontSize=this.fontSize+"px";
        }
    },
  components: {
  }
}
</script>
<style>
  .home{
    width: 100%;
    height: 100%;
    background-color: pink;
    padding-top: 60px;
    /*overflow: hidden;*/
    padding-left: 150px;
    box-sizing: border-box;
  }
  .home h1{
    font-size: 66px;
    /*font-family:;*/
    margin-bottom: 10px;
  }
  .content{
    background-color: white;
    border-radius: 50px;
    padding: 50px;
    width: 1200px;
    /*margin-left: 50px;*/

  }
  .content textarea{
    resize: none;
    box-sizing: border-box;
    width: 650px;
    height: 535px;
  }
  .content img{
    margin-left: 10px;
  }
  .content input{
    display: inline-block;
    width: 40px;
  }
  .content .someSet .someSet-children{
    margin-left: 20px;
  }
</style>
