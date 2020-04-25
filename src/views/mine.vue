<template>
    <div class="mine">
        <div class="container">
            <div class="content-wrapper">
                <div class="slider-bar">
                    <ul class="mine-tab">
                        <li class="up-info" @click="changeSelect(1)">博主信息</li>
                        <li class="mine-info"  @click="changeSelect(2)">个人信息</li>
                        <!--<li class="edit-info"  @click="changeSelect(3)">更改</li>-->
                    </ul>
                </div>
                <div class="content">
                    <Upinfo  v-show="selected===1"></Upinfo>
                    <Upinfo  v-show="selected===2"></Upinfo>

                    <UpdateInfo v-show="selected===3"></UpdateInfo>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import Upinfo from "./../components/mine/Upinfo";
    import UpdateInfo from "./../components/mine/UpdateInfo"
    export default {
        name: "index",
        components:{Upinfo,UpdateInfo},
        data(){
            return{
                selected:1
            }
        },
        methods:{
            changeSelect(value){
                this.selected = value;
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
.mine{
    overflow-x: hidden;
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
        overflow: auto;
        .content-wrapper{
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: row;
            .content{
                padding: 20px;
                margin-top: 20px;
                flex: 1;
                height: 100%;
                background-color: #fdfdfe;
                border-radius: 8px;
                margin-left: 30px;
            }
            .slider-bar{
                margin-top: 20px;
                width: 290px;
                height: 100%;
                border-radius: 8px;
                margin-left: 15px;

                background-color: #fdfdfe;
                .mine-tab{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    li{
                        height: 50px;
                        text-align: left;
                        /*vertical-align: center;*/
                        line-height: 50px;
                        padding-left: 20px;
                        box-sizing: border-box;
                        color: #737373;
                        cursor: pointer;
                        &:hover{
                            background-color: #1aad19;
                            color: white;
                        }
                    }
                    li+li{
                        border-top: 1px solid #F1F1F1;
                    }

                }
            }
        }
    }

    @media screen and (min-width: 978px) {
        .container{
            width: 85%;
            height: 100%;

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
