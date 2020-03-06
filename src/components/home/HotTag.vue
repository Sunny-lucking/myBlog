<template>
    <div class="hot-tag">
        <h3 class="hot-title">热门标签</h3>
        <ul class="hot-list" >
            <router-link tag='li' class="hot-item" v-for="(item,index) in $store.state.tagsList" :key="index" :to="{name:'category',query:{tagName:item.tagName,pageIndex:1}}">
                {{item.tagName}}
            </router-link>
{{$store.state.tags}}
        </ul>
    </div>
</template>

<script>

    export default {
        name: "HotTag",
        data(){
            return{
                tags:''
            }
        },
    }
</script>

<style scoped lang="scss">
    .hot-tag{
        margin-top: 15px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fdfdfe;
        .hot-title{
            background-color: #f6f6fa;
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            height: 30px;
            padding: 8px 20px;
            color: #737373;
        }
        .hot-list{
            display: flex;
            flex-wrap: wrap;
            background-color: #fdfdfe;
            padding: 20px;
            /*justify-content: flex-start;*/

            .hot-item{
                height: 25px;
                line-height: 25px;
                font-size: 16px;
                border: 1px solid #ccc;
                padding: 5px 15px;
                border-radius: 6px;
                margin-left: 10px;
                margin-top: 15px;
                &.hot-item:hover{
                    border-color: #1aad19;
                    cursor: pointer;
                    color: #1aad19;
                    text-shadow: -1px -1px white, 1px 1px gray, 2px 2px #7a7a7a, 3px 3px #757575;
                }
            }
        }
    }
</style>
