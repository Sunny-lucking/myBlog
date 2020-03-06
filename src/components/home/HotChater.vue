<template>
    <div class="hot-chater">
        <h3 class="hot-title">热门文章</h3>
        <ul class="latest-list" v-if="articleOfHot.length>0">
            <router-link tag="a" target="_blank" class="list-item" :to="{name:'myarticle',query:{articleID:item._id}}"  v-for="(item,index) in articleOfHot" :key="index" style="text-decoration: none">
                <!--<img :src="item.cover" alt="" class="item-img">-->
                <el-image
                        style="width: 100px;height: 63px;border-radius: 5px;cursor: pointer;"
                        :src="imgUrlFormat(item.cover)"
                        fit="cover"></el-image>
                <div class="content-wrapper">
                    <h3 class="content-title">{{item.title}}</h3>
                    <p class="content-info">
                        <span class="info-time"> {{item.time|formatTimeNoClock()}}</span>
                        <span class="info-view"> {{item.pvcount}}次浏览</span>
                    </p>
                </div>
            </router-link>


        </ul>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";
    // import {myMixin} from "./../../server/interface/utils/mixins"
    export default {
        name: "HotChater",
        data(){
           return {
               articleOfHot:[]
           }
        },
        methods:{

            async getHotArticle(){
               let {status,data:{articleOfHot}} = await this.$http.get(BASE_URL+'/api/article/getArticleOfHot')
                this.articleOfHot = articleOfHot
            },
            onclickForReflesh(){
                console.log("hah");
                // this.$router.go(0)
            }
        },
        created(){
            this.getHotArticle()
        }
    }
</script>

<style scoped lang="scss">
.hot-chater{
    margin-top: 15px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fafff8;
    .hot-title{
        background-color: #f6f6fa;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        height: 30px;
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
            display: flex;
            flex-direction: row;
            .item-img{
                width: 100px;
                height: 63px;
                border-radius: 5px;
                cursor: pointer;
            }
            .content-wrapper{
                display: flex;
                flex-direction: column;
                margin-left: 5px;
                margin-top: 5px;

                .content-title{
                    overflow: hidden;
                    height:40px;
                    font-weight: 700;
                    line-height: 20px;
                    color: #555;
                    font-size: 14px;
                    cursor: pointer;

                }
                .content-info{
                    color: #999;
                    font-size: 12px;
                    margin-top: 3px;
                    span+span{
                        margin-left: 3px;
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

}
</style>
