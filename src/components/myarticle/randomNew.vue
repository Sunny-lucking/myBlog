<template>
    <div class="randomNew">
        <div class="new-tip">随机新闻</div>
        <ul class="new-list" v-if="articleOfRandom">
            <router-link tag="a" class="new-item" v-for="(item,index) in articleOfRandom.slice(0,4)" :key="index" :to="{name:'myarticle',query:{articleID:item._id}}" style="text-decoration: none" target="_blank">
                <el-image
                        style="width: 130px; height: 80px;border-radius: 50px"
                        :src="imgUrlFormat(item.cover)"
                        fit="cover"></el-image>
                <h4 class="title">{{item.title}}</h4>
            </router-link>


        </ul>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "randomNew",
        data(){
            return {
                articleOfRandom:[]
            }
        },
        methods:{
            onclickForReflesh(){
                console.log("hah");
                // this.$router.go(0)
            },
            async getRandomArticle(){
                let {status,data:{articleOfRandom}} = await this.$http.get(BASE_URL+'/api/article/getArticleOfRandom')
                this.articleOfRandom = articleOfRandom
            },
        },
        created(){
            this.getRandomArticle()
        }
    }
</script>

<style scoped lang="scss" >
.randomNew{
    margin-top: 20px;
    .new-tip{
        height: 20px;

    }
    .new-list{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .new-item{
            flex: 1;
            /*padding: 10px;*/
            box-sizing: border-box;
            align-items: center;
            display: flex;
            flex-direction: column;
            cursor: pointer;

            justify-content: center;
            img{
                width: 130px;
                height: 80px;
            }
            .title{
                text-align: center;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                /*background-color: red;*/
                width: 70%;
                overflow: hidden;
            }
        }
    }
}
</style>
