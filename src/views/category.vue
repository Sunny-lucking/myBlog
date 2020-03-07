<template>
    <div class="home">
        <div class="container">
            <div class="content-wrapper">
                <div class="content">
                    <Latest></Latest>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            style="margin-top:20px"
                            background
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="count">
                    </el-pagination>
                </div>
                <div class="slider-bar">
                    <HotChater :articleOfHot="articleOfHot"></HotChater>
                    <Statistic></Statistic>
                    <Link/>
                    <Advertisement></Advertisement>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {BASE_URL} from "../global/util";
    import Latest from "./../components/home/Latest"
    import HotChater from "./../components/category/HotChater"
    import Statistic from "./../components/home/Statistic"
    import Link from "./../components/home/Link"
    import Advertisement from "./../components/home/Advertisement"

    export default {
        name: "category",
        components:{Latest,Statistic,Link,Advertisement,HotChater},
        data(){
            return {
                ArticleOfTag:'',
                count:0,
                articleOfHot:[]
            }
        },

        // async asyncData({app,query}){
        //     console.log("haha");
        //     console.log(query.tagName);
        //     let resultOfArticles = ''
        //     if (query.tagName){
        //         resultOfArticles = await app.$axios.get(encodeURI(BASE_URL+'/article/getArticleByTagName?tagName='+query.tagName+"&pageIndex="+query.pageIndex+"&size=10"))
        //     } else{
        //         resultOfArticles = await app.$axios.get(encodeURI(BASE_URL+'/article/getArticleByKeyWord?keyWord='+query.keyWord+"&pageIndex="+query.pageIndex+"&size=10"))
        //     }
        //
        //     console.log(resultOfArticles.data);
        //     if (resultOfArticles.status===200){
        //         return{
        //             ArticleOfTag: resultOfArticles.data.article,
        //             count:resultOfArticles.data.count,
        //             articleOfHot:resultOfArticles.data.articleOfHot,
        //         }
        //     }else{
        //         return{
        //             ArticleOfTag:[],
        //             count:0
        //         }
        //     }
        // },
        computed:{
            currentPage:{
                get(){
                    return parseInt(this.$route.query.pageIndex)
                },
                set(){

                }
            },
        },
        watch: {
            $route (to, from) {
                this.getArticleByTagName()
            }
        },
        created(){
            this.getArticleByTagName()
        },
        methods:{
            async getArticleByTagName(){
                    if (this.$route.query.tagName){
                        let {status,data:{article,count,articleOfHot}} = await this.$http.get(encodeURI(BASE_URL+'/api/article/getArticleByTagName?tagName='+this.$route.query.tagName+"&pageIndex="+this.$route.query.pageIndex+"&size=10"))
                        this.$store.commit('setLatestList',article)
                        this.count = count
                        this.articleOfHot = articleOfHot
                    } else{
                        let {status,data:{article,count,articleOfHot}} = await this.$http.get(encodeURI(BASE_URL+'/api/article/getArticleByKeyWord?keyWord='+this.$route.query.keyWord+"&pageIndex="+this.$route.query.pageIndex+"&size=10"))
                        this.$store.commit('setLatestList',article)
                        this.count = count
                        this.articleOfHot = articleOfHot
                    }


            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let _this = this
                this.$router.push({
                    name:'category',
                    query:{
                        pageIndex: val,
                        tagName:_this.$route.query.tagName,
                        keyWord:_this.$route.query.keyWord
                    }
                })
                console.log(`当前页: ${val}`);
            },
        }
    }
</script>

<style scoped lang="scss">
    body{

    }
    .home{
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
            margin-bottom: 10px;
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
<style lang="scss">
    .el-pagination{
        .el-pager{
            li{
                background-color: #fdfdfe!important;
            }
            .active{
                color: blue;
            }

        }
        button{
            background-color: #fdfdfe!important;
        }
        span{
            background-color: #fdfdfe!important;
        }
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        color: white;
        background-color: #409EFF!important;
    }
</style>
