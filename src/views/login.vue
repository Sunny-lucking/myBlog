<template>
    <div class="login" :style="{backgroundImage: 'url(' + imgs[index2] + ')'}">
        <div class="sub-login" :class="{'bg1':index2===0,'bg2':index2===1,'bg3':index2===2}"></div>
        <div class="login-wrapper">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="登陆" name="first">
                    <Login></Login>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <Register></Register>
                </el-tab-pane>

            </el-tabs>
        </div>


    </div>
</template>

<script>
    import Login from "./../components/login/Login"
    import Register from "./../components/login/Register"
    export default {
        name: "login",
        data(){
            return {
                isAnimation:true,
                index:0,
                index2:0,
                imgs:[
                    require("./../components/login/img/2.jpg"),
                    require("./../components/login/img/3.jpg"),
                    require("./../components/login/img/1.jpg"),
                ],
                //
                activeName: 'first',
                //


            }
        },
        components:{Login,Register},
        methods:{
            handleClick(tab, event) {
            },
            //

        },
        mounted(){
            let _this = this;
            setInterval(()=>{

                _this.index++;
                if (_this.index>2){
                    _this.index2=0;
                    _this.index=0;
                }else{
                    _this.index2= _this.index;
                }





            },5000)
        }
    }

</script>

<style lang="scss">
    .el-tabs__item,.is-top{
        font-size: 30px;
        color: slategray;
        font-weight: bold;
        /*height: 100px;*/
        .is-active{
            color: white;
        }
    }
    .el-tabs__active-bar{
        color: white;
        background-color: white;
    }
    .el-tabs__content{

    }
</style>

<style scoped lang="scss">

    .login{
        /*background-color: red;*/

        width: 100%;
        height: 100%;

        min-height: 100%;
        background-size: cover;
        position: relative;
        left: 0;
        top: 0;
        .sub-login{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            &.bg1{
                background: url("./../components/login/img/1.jpg");
                background-size: cover;
                animation: show 5s;
                @keyframes show {
                    0%{
                        opacity: 1;
                    }
                    100%{
                        opacity: 0;
                    }
                }
                z-index: -20;
            }
            &.bg2{

                background: url("./../components/login/img/2.jpg");
                background-size: cover;
                animation: show1 5s;

                @keyframes show1 {
                    0%{
                        opacity: 1;
                    }
                    100%{
                        opacity: 0;
                    }
                }
            }
            &.bg3{

                background: url("./../components/login/img/3.jpg");
                background-size: cover;
                animation: show2 5s;

                @keyframes show2 {
                    0%{
                        opacity: 1;
                    }
                    100%{
                        opacity: 0;
                    }
                }
            }
        }
        .login-wrapper{

            width: 300px;
            height: 200px;
            /*height: 600px;*/
            /*background-color: red;*/
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-150px) translateX(-150px);

        }
    }
    .is-stretch{
        height: 100px;
    }
    .el-tabs__item .is-active .is-top{
        color: white;
        font-size: 50px;
    }
</style>
