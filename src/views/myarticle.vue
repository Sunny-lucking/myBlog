<template>
    <div class="article">
        <div class="container">
            <div class="content-wrapper" v-if="article">
                <div class="content">
                   <div class="article-title">
                      <div class="article-title-wrapper">
                          <h4>{{article[0].title}}</h4>
                      </div>
                       <p class="content-info">
                           <span class="el-icon-info"> {{article[0].username}}</span>
                           <span class="info-time el-icon-time"> {{article[0].time|formatTime}}</span>
                           <span class="info-view el-icon-view"> {{article[0].pvcount}}次浏览</span>
                       </p>
                       <!--<div class="article-share">-->
                           <!--<my src="./../components/myarticle/img/qq.jpg" alt=""  @click="shareToQQ">-->
                           <!--<img src="https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=1209728152,3205229512&fm=74&app=80&f=JPG&size=f121,121?sec=1880279984&t=bce6579c7854de4dfd4999a645e2d99f" alt="" @click="shareToRoom">-->
                           <!--<img src="https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/241f95cad1c8a7862ab4b2436d09c93d71cf50e5.jpg" alt="" @click="shareToMicroblog">-->
                           <!--<img src="./../components/myarticle/wx.jpg" alt="" @click.once="getQrcode">-->
                           <!--</my>-->
                       <!--</div>-->
                   </div>
                   <div class="article-content">
                        <div class="article-summary">
                            <p><strong>摘要：</strong>
                                {{article[0].summary}}
                            </p>

                        </div>
                       <article class="article-text" v-html="article[0].content">

                       </article>


                       <Feeling
                               :articleID="article[0]._id"
                               :praise="article[0].praise"
                               :applaud="article[0].applaud"
                               :caonima="article[0].caonima"
                               :angry="article[0].angry"
                               @updateFeelingData="getArticle"
                       ></Feeling>
                       <randomNew></randomNew>
                       <LastAndNext :lastArticle="lastArticle" :nextArticle="nextArticle"></LastAndNext>
                   </div>
                    <Comment :comments.sync="comments"
                             @onclickForShowDrawer="onclickForShowDrawer"
                             @updateComment="getComment"
                    ></Comment>
                    <PersonSpeak
                            :comments.sync="comments"
                            @onclickForShowDrawer="onclickForShowDrawer"
                            @updateComment="getComment"
                    ></PersonSpeak>
                    <!--{{lastArticle}}-->
                    <!--{{nextArticle}}-->
                </div>
                <div class="slider-bar">
                    <HotChater></HotChater>
                </div>
            </div>
            <!--<el-button @click="onclickForShowDrawer" type="primary" style="margin-left: 16px;">-->
                <!--点我打开-->
            <!--</el-button>-->

        </div>
        <el-drawer
                :with-header="false"
                :visible.sync="isShowDrawer"
                direction='rtl'
                :before-close="closeDrawer">
            <UserInfo :targetUserId="targetUserId" :userId="user._id"></UserInfo>
        </el-drawer>
    </div>
</template>

<script>
    import jwt_decode from "jwt-decode";
    import {BASE_URL} from "../global/util";
    import HotChater from "./../components/home/HotChater"
    import Feeling from "./../components/myarticle/Feeling"
    import randomNew from "./../components/myarticle/randomNew"
    import Comment from "./../components/myarticle/Comment"
    import LastAndNext from "./../components/myarticle/LastAndNext"
    import PersonSpeak from "./../components/myarticle/PersonSpeak"
    import UserInfo from "./../components/myarticle/UserInfo"
    export default {
        name: "myarticle",
        data(){
            return{
                isShowDrawer:false,
                isShowQRCode:false,
                qrcode:null,
                myarticle:'',
                comments: '',
                lastArticle:'',
                nextArticle:'',
                targetUserId:'',
                userId:'',
                article:'',
                user:''
            }
        },
        // components:{Footer,Header,HotChater,Feeling,randomNew,LastAndNext,Comment,PersonSpeak,UserInfo},
        components:{HotChater,randomNew,Feeling,LastAndNext,Comment,PersonSpeak,UserInfo},
        methods:{
            async getArticle(){
                let {status,data:{article}} = await this.$http.get(BASE_URL+'/api/article/getOneArticle?articleID='+this.$route.query.articleID);
                this.article = article
            },
            async getComment(){
                let {data:{comments}} = await this.$http.get(BASE_URL+'/api/comment/getComment?articleID='+this.$route.query.articleID);
                this.comments = comments
            },
            async getLastAndNext(){
                let {data:{lastArticle,nextArticle}} = await this.$http.get(BASE_URL+'/api/article/getNextAndLast?articleID='+this.$route.query.articleID);
                this.nextArticle = nextArticle;
                this.lastArticle = lastArticle
            },
            closeDrawer(){
                let _this = this
                this.$confirm('确认关闭？')
                    .then(_ => {
                        // done();
                        _this.isShowDrawer = false
                    })
                    .catch(_ => {});
            },
            onclickForShowDrawer(targetUserId){
                this.targetUserId = targetUserId
                this.isShowDrawer = true

            },
            //分享到QQ空间(可用)
            shareToRoom() {
                //自定义内容
                const share = {
                    title: "和尚",
                    desc: "深度好文",
                    image_url: ["https://upload-images.jianshu.io/upload_images/16535515-55ae6745de87e785.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"],
                    share_url: "https://mp.weixin.qq.com/s?__biz=MzU5NDM5MDg1Mw==&mid=2247483795&idx=1&sn=77070ab9b09be5f712c98e214bc060f4&chksm=fe00bbb9c97732af9da06e7ede7661b35044fdb655c9a8ba9791dc9706394a038877469fe098&token=955086778&lang=zh_CN#rd"
                };
                let image_urls = share.image_url.map(function(image) {
                    return encodeURIComponent(image);
                });
                //跳转地址
                location.replace(
                    "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&pics=" +
                    image_urls.join("|") +
                    "&summary=" +
                    share.desc
                );
            },
            shareToMicroblog() {
                //自定义内容
                const share = {
                    title: "和尚",
                    image_url: ["https://upload-images.jianshu.io/upload_images/16535515-55ae6745de87e785.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"],
                    share_url: "https://mp.weixin.qq.com/s?__biz=MzU5NDM5MDg1Mw==&mid=2247483795&idx=1&sn=77070ab9b09be5f712c98e214bc060f4&chksm=fe00bbb9c97732af9da06e7ede7661b35044fdb655c9a8ba9791dc9706394a038877469fe098&token=955086778&lang=zh_CN#rd"
                };
                //跳转地址
                location.replace(
                    "https://service.weibo.com/share/share.php?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&pic=" +
                    share.image_url +
                    "&searchPic=true"
                );
            },
            //分享到QQ好友(PC端可用)
            shareToQQ() {
                //此处分享链接内无法携带图片
                const share = {
                    title: "东金秀财",
                    desc: "描述",
                    share_url: "https://xiucai.neafex.com/#/"
                };
                location.replace(
                    "https://connect.qq.com/widget/shareqq/index.html?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&desc=" +
                    share.desc
                );
            },
            getQrcode() {
                this.qrcode = new QRCode('qrcode', {
                    width: 132,
                    height: 132,
                    text: 'https://www.baidu.com', // 二维码地址
                    colorDark : "#000",
                    colorLight : "#fff",
                })
            },
        },
        mounted(){
            // let id = localStorage.getItem('userId')
            // this.userId = {userId:id}
        },
        created(){
            this.getArticle()
            this.getComment();
            this.getLastAndNext();
            const token = localStorage.blogFrontToken;
            // 解析token
            this.user = jwt_decode(token);

        }

    }
</script>

<style scoped lang="scss" ref="">
    .article{
        overflow-x: hidden;
        width: 100%;
        min-height: 100%;
        background-color: #f1f1f1;
        .container{
            margin-top: 55px;
            /*margin-bottom: 10px;*/
            width: 85%;
            height: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
            .content-wrapper{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                .content{
                    flex: 1;
                    height: 100%;
                    /*background-color: blue;*/
                    border-radius: 8px;
                    .article-title{
                        /*height: 400px;*/
                        margin-top: 15px;
                        background-color: #f7f7f7;
                        padding: 1rem 1.5rem;
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        .article-title-wrapper{
                            /*overflow-x: hidden;*/
                            /*flex-wrap: nowrap;*/
                            /*height: 400px;*/
                            /*background-color: red;*/
                            width: 80%;
                            overflow: hidden;
                            /*filter:drop-shadow( 10px 30px 7px rgb(116, 115, 115));*/
                            h4{
                                /*white-space: nowrap;*/
                                width: 100%;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                /*overflow: hidden;*/
                                display: block;
                                color: rgb(65, 140, 225);
                                font-size: 1.2rem;
                                filter: url('#wreckit');
                                background: linear-gradient(to right,rgb(0, 0, 0) 0%,rgb(255, 155, 243) 80%,rgb(255, 129, 225) 100%);
                                /* 背景填充到文本中 */
                                -webkit-text-fill-color: transparent;
                                -webkit-background-clip: text;
                                /* ----------------------------- */
                                animation: wavemover 1s linear infinite alternate;

                                /* 这样设置看似文本没有位置，实际上是变化 */

                            }
                            @keyframes wavemover {
                                0% {
                                    padding-left: 0;
                                    transform: translateX(0px);
                                }
                                /**/
                                100% {
                                    padding-left: 0px;
                                    transform: translateX(0px);
                                }
                            }
                        }
                        .content-info{
                            color: #999;
                            font-size: 12px;
                            margin-top: 25px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            /*padding-right: 60%;*/
                            span:first-child{
                                flex: 0.7;
                                text-align: left;

                            }
                            span+span{
                                /*margin-left: 30px;*/
                                flex: 1;
                            }
                            span:last-child{
                                flex: 1.3;
                            }
                        }
                        .article-share{
                            margin-top: 20px;
                            display: flex;
                            img{
                                width: 30px;
                                height: 30px;
                                margin-left: 10px;
                            }
                        }
                    }
                    .article-content{
                        padding: 2rem 1.5rem;
                        background-color: #fdfdfe;
                        .article-summary{
                            padding: 0.7em;
                            background-color: #f3fdee;


                            p{
                                line-height: 30px;
                                font-size: 14px;
                                font-weight: 300;
                            }
                            strong{
                                font-weight: 700;
                                font-size: 14px;
                                line-height: 30px;
                            }

                        }
                        .article-text{
                            /*text-indent: 1rem;*/
                            margin-top: 3rem;
                            line-height: 30px;
                            font-size: 14px;
                            color: #555;
                        }
                    }
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
                    height: 20vw;
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
