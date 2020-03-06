<template>
    <div class="link">
        <h4 class="link-title">友情链接</h4>
        <ul class="link-list">
            <a class="link-item" target="_blank" href="http://101.37.32.66:5000" style="text-decoration: none">博客后台管理</a>
            <a class="link-item" target="_blank" href="http://101.37.32.66:5002" style="text-decoration: none">小羊商城（移动端）</a>
            <a class="link-item" target="_blank" href="http://101.37.32.66:5002/small_route" style="text-decoration: none">亦称家具(微信小程序)</a>
            <!--<li class="link-item">我的商城</li>-->
            <!--<li class="link-item">我爱打字</li>-->
            <!--<li class="link-item">字爱打我</li>-->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Link"
    }
</script>

<style scoped lang="scss">
    .link{
        background-color: #fdfdfe;
        padding: 40px 5px;
        margin-top: 15px;
        position: relative;
        border-top-left-radius: 5px;
        .link-title{
            padding: 5px 10px;
            background-color: #5CB85C;
            color: white;
            width: 67px;
            position: absolute;
            left: 0;
            top: 0;
            border-top-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .link-list{
            display: flex;
            flex-wrap: wrap;
            .link-item{
                width: 45%;
                height: 30px;
                font-size: 12px;
                line-height: 30px;
                border: 1px solid #1aad19;
                margin-left: 10px;
                margin-top: 20px;
                text-align: center;
                color: #1aad19;
                transition: all .5s;
                &.link-item:hover{
                    border-top-left-radius: 40px;
                    border-bottom-right-radius: 40px;
                    background-color: #1aad19;
                    color: white;
                }
            }
        }

    }

</style>
