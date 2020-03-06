<template>
    <div class="recommend">
        <h4 class="recommend-title">特别推荐</h4>
        <ul class="recommend-list" v-if="articleOfRandom.length>0">
            <router-link tag="li" class="recommend-item"   v-for="(item,index) in articleOfRandom" :key="index" :to="{name:'myarticle',query:{articleID:item._id}}">
                <!--<img :src="item.cover" alt="" class="item-img">-->
                <el-image
                        style="width: 110px; height: 80px"
                        :src="imgUrlFormat(item.cover)"
                        fit="cover"></el-image>
                <div class="item-content">
                    <h3 class="item-title">{{item.title}}</h3>
                    <p class="item-detail">{{item.summary}}</p>
                </div>
            </router-link>


        </ul>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Recommend",
        data(){
           return{
               articleOfRandom:[]
           }
        },
        created(){
           this.getHotArticle()
        },
        methods:{
            imgUrlFormat(url){
                return `${BASE_URL}/${url}`
            },
            async getHotArticle(){
                let {status,data:{articleOfRandom}} = await this.$http.get(BASE_URL+'/api/article/getArticleOfRandom')
                this.articleOfRandom = articleOfRandom
            },
            // goArticle(id){
            //     console.log("进来了");
            //     console.log("id",id);
            //     localStorage.setItem("articleID",id)
            //     this.$router.push("/article");
            // },
        }
    }
</script>

<style scoped lang="scss">
.recommend{
    margin-top: 15px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fafff8;
    .recommend-title{
        background-color: #f6f6fa;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        height: 20px;
        padding: 8px 20px;
        color: #737373;
    }
    .recommend-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .recommend-item{
            width: 50%;
            height: 108px;
            box-sizing: border-box;
            background-color: #fdfdfe;
            display: flex;
            padding: 15px 20px;
            cursor: pointer;

            .item-img{
                width: 110px;
                height: 80px;
                border-radius: 8px;
            }
            .item-content{
                width: 60%;
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                margin-top: 8px;
                .item-title{

                    overflow: hidden;
                    height: 25px;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 25px;
                }
                .item-detail{
                    margin-top: -2px;
                    color: #999;
                    font-size: 13px;
                    line-height: 16px;


                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            &.recommend-item:hover{
                .item-content{
                    .item-title{
                        color: #1aad19;
                    }
                }
            }
        }
        li:nth-child(n+3){
            /*border: 1px solid #000;*/
            border-top: 1px solid #F1F1F1;
        }
        li:nth-child(2n){
            border-left: 1px solid #F1F1F1;
        }



    }


}
@media screen and (min-width: 978px) {

}
@media  screen and (min-width:730px) and (max-width: 977px) {


}
@media  screen and (max-width: 730px) {
    .recommend{
        display: none;
    }
}
</style>
