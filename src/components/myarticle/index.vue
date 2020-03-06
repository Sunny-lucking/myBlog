<template>
    <div class="article">
        <div class="container">
            <div class="content-wrapper">
                <div class="content">
                   <div class="article-title">
                      <div class="article-title-wrapper">
                          <h4>为什么男人喜欢绿茶表,这让女汉子……</h4>
                          <svg display="none">
                              <defs>
                                  <filter id="wreckit">
                                      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
                                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                                  </filter>
                              </defs>
                          </svg>
                      </div>
                       <p class="content-info">
                           <span class="el-icon-info"> 培歌行</span>
                           <span class="info-time el-icon-time"> 2018-07-07</span>
                           <span class="info-view el-icon-view"> 1739次浏览</span>
                       </p>
                       <div class="article-share">
                           <img src="./img/qq.jpg" alt=""  @click="shareToQQ">
                           <img src="https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=1209728152,3205229512&fm=74&app=80&f=JPG&size=f121,121?sec=1880279984&t=bce6579c7854de4dfd4999a645e2d99f" alt="" @click="shareToRoom">
                           <img src="https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/241f95cad1c8a7862ab4b2436d09c93d71cf50e5.jpg" alt="" @click="shareToMicroblog">
                           <img src="./img/wx.jpg" alt="" @click.once="getQrcode">
                           <div>
                               <div id="qrcode"></div> <!-- 创建一个div，并设置id为qrcode -->
                           </div>
                       </div>
                   </div>
                   <div class="article-content">
                        <div class="article-summary">
                            <p><strong>摘要：</strong>
                                今天和大家分享一个营销的理念！也是我从别的渠道看到的觉得非常不错，分享给大家！ 有一个营销经理想考考他的手下，就给他们出了一道题，把梳子卖给和尚。 第一个人：出了门
                            </p>

                        </div>
                       <article class="article-text">
                           今天和大家分享一个营销的理念！也是我从别的渠道看到的觉得非常不错，分享给大家！
                            <br/>
                           有一个营销经理想考考他的手下，就给他们出了一道题，把梳子卖给和尚。
                           <br/>
                           　　第一个人：出了门就骂，什么狗经理，和尚都没有头发，还卖什么梳子！找个酒馆喝起了闷酒，睡了一觉，回去告诉经理，和尚没有头发，梳子无法卖！经理微微一笑，和尚没有头发还需要你告诉我？
                           <br/>
                           　　第二个人：来到了一个寺庙，找到了和尚，对和尚说，我想卖给你一把梳子，和尚说，我没用。那人就把经理的作业说了一遍，说如果卖不出去，就会失业，你要发发慈悲啊！和尚就买了一把。
                           <br/>
                           　　第三个人：也来到一个寺庙卖梳子，和尚说，真的不需要的。那人在庙里转了转，对和尚说，拜佛是不是要心诚，和尚说，是的。心诚是不是需要心存敬意，和尚说，要敬。那人说，你看，很多香客很远来到这里，他们十分虔诚，但是却风尘仆仆，蓬头垢面，如何对佛敬？如果庙里买些梳子，给这些香客把头发梳整齐了，把脸洗干净了，不是对佛的尊敬？和尚话说有理，就买了十把。
                           <br/>
                           　　第四个人：也来到一个寺庙卖梳子，和尚说，真的不需要的。那人对和尚说，如果庙里备些梳子作为礼物送给香客，又实惠、又有意义，香火会更旺的，和尚想了想，有道理，就买了100把。
                           <br/>
                           　　第五个人：也来到一个寺庙卖梳子，和尚说，真的不需要的。那人对和尚说，你是得到高僧，书法甚是有造诣，如果把您的字刻在梳子上，刻些“平安梳”、“积善梳”送给香客，是不是既弘扬了佛法，又弘扬了书法，老和尚微微一笑，善哉！就买了1000把梳子。
                           <br/>
                           　　第六个人：也来到一个寺庙卖梳子，和尚说，真的不需要的。那个人和和尚说了一番话，却卖出了一万把梳子。那人说了些什么呢？他告诉和尚，梳子是善男信女的必备之物，经常被女香客带是在身上，如果大师能为梳子开光，成为她们的护身符，既能积善行善、又能保佑平安，很多香客还能为自己的亲朋好友请上一把，保佑平安，弘扬佛法，扬我寺院之名，岂不是天大善事？大师岂有不做之理？阿弥陀夫，善哉！善哉！大师双手合十，施主有这番美意，老衲岂能不从？就这样，寺院买了一万把，取名“积善梳”、“平安梳”，由大师亲自为香客开光，竟十分兴隆。当然，开光所捐的善款也不菲啊！ <br/>

                           　　各位看看：
                           <br/>
                           　　第一个人受传统观念的束缚太厉害，用常理去考虑销售，是不适合做销售的。
                           <br/>
                           　　第二个人是在卖同情心，这是最低级的销售方法叫“叩头营销”，是不能长久的。
                           <br/>
                           　　第三、四人为客户着想，可以说是“顾客满意战略”，自然会有好的效果。
                           <br/>
                           　　第五人不仅能够然顾客满意，还能迎合顾客心理，自然就不会差。
                           <br/>
                           　　第六人就已经达到了物我两重天的境界，不是在卖梳子，而是在卖护身符，把顾客的价值最大化，自然也就不足为奇了。
                           <br/>
                           　　只有初级销售人员才去卖产品本身，而正的销售卖的是一种理念，一种思维模式。
                       </article>


                       <Feeling></Feeling>
                       <randomNew></randomNew>
                       <LastAndNext></LastAndNext>
                   </div>
                    <Comment></Comment>
                    <PersonSpeak></PersonSpeak>

                </div>
                <div class="slider-bar">
                    <HotChater></HotChater>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Header from "./../../../components/Header"
    import Footer from "./../../../components/Footer"
    import HotChater from "./../home/component/HotChater"
    import Feeling from "./Feeling"
    import randomNew from "./randomNew"
    import Comment from "./Comment"
    import LastAndNext from "./LastAndNext"
    import PersonSpeak from "./PersonSpeak"
    import QRCode from 'qrcodejs2'  // 引入qrcode
    export default {
        name: "index",
        data(){
            return{
                isShowQRCode:false,
                qrcode:null
            }
        },
        components:{Footer,Header,HotChater,Feeling,randomNew,LastAndNext,Comment,PersonSpeak},
        methods:{
            //分享到QQ空间(可用)
            shareToRoom() {
                //自定义内容
                console.log("haha");
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
        }

    }
</script>

<style scoped lang="scss" ref="">
    .article{

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
                            filter:drop-shadow( 10px 30px 7px rgb(116, 115, 115));
                            h4{
                                white-space: nowrap;
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
