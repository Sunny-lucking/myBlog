<template>
    <div class="advertisement">
        <h4 class="advertisement-title">联系方式</h4>
        <img class="advertisement-img" src="./../../assets/myqrcode.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "Advertisement"
    }
</script>

<style scoped lang="scss">
.advertisement{
    background-color: #fdfdfe;
    padding: 40px 5px;
    margin-top: 15px;
    position: relative;
    border-top-left-radius: 5px;
    .advertisement-title{
        padding: 5px 10px;
        background-color: #5CB85C;
        color: white;
        width: 70px;
        position: absolute;
        left: 0;
        top: 0;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .advertisement-img{
        width: 80%;
        height: 70%;
        margin-left: 50%;
        transform: translateX(-50%);
        /*border-radius: 10%;*/
    }

}
</style>
