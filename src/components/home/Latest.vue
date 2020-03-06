<template>
    <div class="latest">
        <h4 class="latest-title">{{$route.query.tagName?$route.query.tagName:'最新发布'}}</h4>
        <ul class="latest-list" v-if="$store.state.LatestList.length>0">
            <router-link class="list-item"  tag="li" v-for="(item,index) in $store.state.LatestList" :key="index" :to="{name:'myarticle',query:{articleID:item._id}}">
                <!--<img :src="item.cover" alt="" class="item-img">-->
                <el-image
                        style="width: 220px;height: 150px;border-radius: 5px;
                cursor: pointer;"
                        :src="imgUrlFormat(item.cover)"
                        fit="cover"></el-image>
                <div class="content-wrapper" style="text-align: center">
                    <h3 class="content-title">{{item.title}}</h3>
                    <p class="content-detail">{{item.summary}}</p>
                    <p class="content-info">
                        <span class="el-icon-info"> {{item.username}}</span>
                        <span class="info-time el-icon-time"> {{item.time|formatTime()}}</span>
                        <span class="info-view el-icon-view"> {{item.pvcount}}次浏览</span>
                    </p>
                </div>
            </router-link>


        </ul>
        <div v-else style="margin: 0 auto;text-align: center">
            <img src="http://pic.90sjimg.com/design/00/93/88/11/5905a3b6cf4c4.png%21/fwfh/804x734/quality/90/unsharp/true/compress/true" alt="" style="width: 200px">
            <p style="font-weight: bolder">小羊提醒：暂时还没有评论哦，快来抢沙发吧！</p>
        </div>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Latest",
        data(){
            return{
                articleOfLatest:[]
            }
        },
        methods:{
            imgUrlFormat(url){
                return `${BASE_URL}/${url}`
            },
            // async getLatestArticle(){
            //     let {status,data:{articles}} = await this.$http.get(BASE_URL+'/api/article/getArticleOfLatest')
            //     this.articleOfLatest = articles
            // },
        },
        created(){
            // this.getLatestArticle()
        }
    }
</script>

<style scoped lang="scss">
.latest{
    /*margin-top: 15px;*/
    width: 100%;
    box-sizing: border-box;
    background-color: #fafff8;
    .latest-title{
        background-color: #f6f6fa;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        height: 20px;
        padding: 8px 20px;
        color: #737373;
    }
    .latest-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .list-item{
            position: relative;
            width: 100%;
            /*height: 108px;*/
            box-sizing: border-box;
            background-color: #fdfdfe;

            padding: 20px 20px 20px 20px;


            .item-img{
                width: 220px;
                height: 150px;

            }
            .content-wrapper{
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                margin-top: 8px;
                .content-title{
                    overflow: hidden;
                    height: 25px;
                    font-weight: 700;
                    line-height: 25px;
                    color: #555;
                    font-size: 16px;
                    cursor: pointer;

                }
                .content-detail{
                    margin-top: 10px;
                    color:#888;
                    font-size: 15px;
                    line-height: 30px;


                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;

                }
                .content-info{
                    color: #999;
                    font-size: 12px;
                    margin-top: 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span:first-child{
                        flex: 0.7;
                        text-align: left;

                    }
                    span+span{
                        /*margin-left: 30px;*/
                        flex: 1;
                    }
                }
            }
        }
        .list-item:hover{
            &.list-item::before{
                content: '';
                border: 2px solid lightgreen;
                position: absolute;
                left: 1px;
                top: 0;
                width: 0.3px;
                height: 100%;
            }
        }


        li:nth-child(n+1){
            border-top: solid 1px #F1F1F1;
            box-sizing: border-box;
        }
    }
    @media screen and (min-width: 978px) {
        .list-item{
            display: flex;
            flex-direction: row;
            .content-wrapper{
                width: 60%;
            }
        }
    }
    @media  screen and (min-width:730px) and (max-width: 977px) {
        .list-item{
            display: flex;
            flex-direction: row;
            .content-wrapper{
                width: 60%;
            }
        }
    }
    @media  screen and (max-width: 730px) {
        .list-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            .content-wrapper{
                width: 90%;
            }
        }
    }
}

</style>
