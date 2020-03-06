<template>
    <div class="footer">
        <p>关于 | 学习 | 娱乐 | 成长 | 留言</p>
        <p>站长统计 | 当前在线[4]</p>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
.footer{
    width: 100%;
    height: 50px;
    background-color: #414141;
    position: relative;
    bottom: 0;
    left: 0;
    p{
        flex: 1;
        line-height: 50px;
        color: #aaa;
        text-align: center;
        font-size: 12px ;
    }

}
@media screen and (min-width: 978px) {
    .footer{
        display: flex;
        flex-direction: row;
        justify-content: center;
        /*align-items: start;*/
        p{
            line-height: 50px;
            padding: 0 10px;
        }
        p:first-child{
            text-align: right;
        }
        p:last-child{
            text-align: left;
        }
    }
}
@media  screen and (min-width:730px) and (max-width: 977px) {
    .footer{
        display: flex;
        flex-direction: column;
        height: 50px;
        p{
            line-height: 25px;
        }
    }

}
@media  screen and (max-width: 730px) {
    .footer{
        display: flex;
        flex-direction: column;
        height: 50px;
        p{
            line-height: 25px;
        }
    }
}
</style>
