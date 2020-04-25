<template>
  <div class="home">

    <div class="container">
      <div class="banner">
        <banner></banner>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <Recommend></Recommend>
          <Latest></Latest>
          <p style="width: 100%;height: 30px;text-align: center;background-color:#909399;color: white;line-height: 30px" @click="goToCategoryByKeyWord">点击查看更多</p>
        </div>
        <div class="slider-bar">
          <HotTag></HotTag>
          <HotChater></HotChater>
          <Statistic></Statistic>
          <Link/>
          <Advertisement></Advertisement>

          <!--<script src="404.js"></script>-->
        </div>
      </div>

    </div>


  </div>
</template>

<script>

    import Banner from "./../components/home/Banner"
    import Recommend from "./../components/home/Recommend"
    import Latest from "./../components/home/Latest"
    import HotTag from "./../components/home/HotTag"
    import HotChater from "./../components/home/HotChater"
    import Statistic from "./../components/home/Statistic"
    import Link from "./../components/home/Link"
    import Advertisement from "./../components/home/Advertisement"
    import {BASE_URL} from "../global/util";
    import jwt_decode from "jwt-decode";
    export default {
        name: "index",
        // components:{Recommend,Latest,HotTag,HotChater,Statistic,Link,Advertisement},
        components:{HotTag,Statistic,Advertisement,Link,HotChater,Recommend,Latest,Banner},
        data(){
           return{
               myBackToTopStyle: {
                   right: '50px',
                   bottom: '50px',
                   width: '40px',
                   height: '40px',
                   borderRadius: '4px',
                   lineHeight: '45px', // 请保持与高度一致以垂直居中
                   background: '#e7eaf1'// 按钮的背景颜色
               },
               user:''
           }
        },
        methods:{
            async getLatestArticle(){
                let {status,data:{articles}} = await this.$http.get(BASE_URL+'/api/article/getArticleOfLatest')
                this.$store.commit('setLatestList',articles)
            },
            goToCategoryByKeyWord(){
                this.$router.push({
                    name:'category',
                    query:{
                        keyWord:'',
                        pageIndex:1
                    }
                })
            },
        },
        mounted(){
            this.getLatestArticle()
            if (localStorage.getItem('blogFrontToken')){
                const token = localStorage.blogFrontToken;
                // 解析token
                this.user = jwt_decode(token);
            }
        },
        // beforeRouteEnter(to,from,next){
        //     next(vm => {
        //         if (from.fullPath === '/edit'){
        //             vm.$router.go(0)
        //         }
        //     });
        // }
    }
</script>

<style scoped lang="scss">
  .home{
    background-image: url("./../assets/zhangnala.jpg");
    background-size: cover;
    background-attachment:fixed;
    &.home::selection {
      background: #81c53f;
      color: #fff;
      text-shadow: none;
    }
    width: 100%;
    min-height: 100%;
    background-color: #f1f1f1;
    /*overflow: hidden;*/
    /*display: block;*/
    .container{
      margin-top: 55px;
      /*margin-bottom: 10px;*/
      width: 85%;
      height: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
      .banner{
        width: 100%;
        border-radius: 10px;
      }
      .content-wrapper{
        width: 100%;
        height: 100%;
        /*background-color: red;*/
        display: flex;
        flex-direction: row;
        .content{
          flex: 1;
          height: 100%;
          /*background-color: blue;*/
          border-radius: 8px;
        }
        .slider-bar{
          width: 290px;
          height: 100%;
          border-radius: 8px;
          margin-left: 15px;
        }
      }
    }

    @media screen and (min-width: 978px) {
      .container{
        width: 85%;
        height: 100%;
        .banner{
          height: 25vw;
        }
      }
    }
    @media  screen and (min-width:730px) and (max-width: 977px) {
      .container{
        width: 100%;
        .banner{
          height: 25vw;
        }
        .slider-bar{
          display: none;
        }
      }

    }
    @media  screen and (max-width: 730px) {
      .container{
        width: 100%;
        .banner{
          height: 30vw;
        }
        .slider-bar{
          display: none;
        }
      }
    }

  }
</style>
