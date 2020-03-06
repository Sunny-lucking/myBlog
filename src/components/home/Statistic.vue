<template>
    <div class="statistic">
        <div class="statistic-title">统计</div>
        <!--<p>本站运行：    <span>1139</span>   天</p>-->
        <!--<p>本月更新：    <span>34</span>     篇</p>-->
        <p>共有文章：    <span>{{countOfAllArticle}}</span>    篇</p>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Statistic",
        data(){
            return{
                countOfAllArticle:0
            }
        },
        async created(){
            let {data:{count}} = await this.$http.get(BASE_URL+'/api/article/getCountOfArticle')
            this.countOfAllArticle = count
        }
    }

</script>

<style scoped lang="scss">
    .statistic{
        background-color: #fdfdfe;
        padding: 40px 60px;
        margin-top: 15px;
        position: relative;
        border-top-left-radius: 5px;
        .statistic-title{
            padding: 5px 10px;
            background-color: #5CB85C;
            color: white;
            width: 35px;
            position: absolute;
            left: 0;
            top: 0;
            border-top-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        p{
            font-size: 17px;
            height: 30px;
            line-height: 30px;
            /*font-weight: bolder;*/
            color: #555;
            span{
                color: red;
                font-weight: bolder;
            }
        }

    }
</style>
