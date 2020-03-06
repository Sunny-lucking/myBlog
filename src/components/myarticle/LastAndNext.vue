<template>
    <div class="last-and-next">
        <div class="last"><span class="tab">上一篇：
        </span>
            <router-link v-if="lastArticle[0]" tag="a" :to="{name:'myarticle',query:{articleID:lastArticle[0]._id}}" class="title" target="_blank">
                {{lastArticle[0].title}}
            </router-link>
            <span class="title" v-else>没有上一篇了</span>
        </div>
        <div class="next"><span class="tab">下一篇：
        </span>
            <router-link v-if="nextArticle[0]" target="_blank" tag="a" :to="{name:'myarticle',query:{articleID:nextArticle[0]._id}}" class="title">
                {{nextArticle[0].title}}
            </router-link>
            <span class="title" v-else>没有下一篇了</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LastAndNext",
        props:['lastArticle','nextArticle'],
        mounted(){
            console.log("哈哈");
            console.log(this.lastArticle);
            console.log(this.nextArticle);
        },
        methods:{
            onclickForReflesh(){
                console.log("hah");
                // this.$router.go(0)
            }
        }
    }
</script>

<style scoped lang="scss">
.last-and-next{

    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div{
        width: 15rem;
        font-size: 14px;
        color: #555;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        .tab{
            color: #bbb;
        }
        .title{
            line-height: 20px;
            font-size: 14px;
            cursor: pointer;
            overflow: hidden;
            &.title:hover{
                color: #1aad19;
            }
        }

    }

}
/*@media screen and (min-width: 978px) {*/
    /*.last-and-next{*/
        /*flex-direction: column;*/
    /*}*/
/*}*/
/*@media  screen and (min-width:730px) and (max-width: 977px) {*/
    /*.last-and-next{*/
        /*flex-direction: column;*/
    /*}*/


/*}*/
/*@media  screen and (max-width: 730px) {*/
    /*.last-and-next{*/
        /*flex-direction: column;*/
    /*}*/
/*}*/

</style>
