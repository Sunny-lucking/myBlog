<template>
    <div class="header">
        <div class="navbar">
            <p class="log">
                <a href="/"><img src="../../../assets/images/log.jpg" alt=""></a>
            </p>
            <ul class="nav">
                    <li class="menu-item"><router-link to="/" tag="a">首页</router-link></li>
                    <li class="menu-item"><a href="#">
                        关于我</a>
                        <ul class="submenu">
                            <li class="submenu-item">
                                <router-link tag="a" to="/mine" href="#">关于我</router-link>
                            </li>
                            <!--<router-link to="album">-->
                                <!---->
                            <!--</router-link>-->
                            <li class="submenu-item" @click="">
                                <router-link to="album" tag="a">
                                    相册
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="#">成长</a></li>
                    <li class="menu-item"><a href="#">学习</a>
                        <ul class="submenu">
                            <router-link tag='li' class="submenu-item" v-for="(item,index) in tags" :key="index" :to="{name:'category',query:{tagName:item.tagName,pageIndex:1}}">
                                {{item.tagName}}
                            </router-link>

                        </ul>
                    </li>
                    <li class="menu-item"><a href="#">娱乐</a></li>
                    <li class="menu-item"><a @click.prevent="onClickForGoToEdit">写文章</a></li>
                    <li v-if="user" style="color: white">
                        欢迎您，<span class="username">{{ user.username }}</span>
                        [<span style="color:#7f828b;cursor: pointer" @click="onClickForExit">退出</span>]
                    </li>
                    <li class="menu-item" v-else><router-link to="/login">登陆/注册</router-link></li>


                </ul>
            <div class="el-menu">
                <el-dropdown style="margin-top:10px;margin-left:1rem;color: darkgray" trigger="click">
                    <el-button type="mini">
                        菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><router-link to="/" tag="a">首页</router-link></el-dropdown-item>
                        <el-dropdown-item> <router-link tag="a" to="/mine" href="#">关于我</router-link></el-dropdown-item>
                        <el-dropdown-item>
                            <router-link tag='li' class="submenu-item" v-for="(item,index) in tags" :key="index" :to="{name:'category',query:{tagName:item.tagName,pageIndex:1}}">
                                {{item.tagName}}
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="menu pull-right" >
                <div class="form-search" style="position: relative">
                    <input type="text" placeholder="输入你要查找的内容"  class="search-input" v-model="keyWord" @keyup.enter="goToCategoryByKeyWord">
                    <button class="searchbtn el-icon-search" @click="goToCategoryByKeyWord"></button>
                    <ul class="search-list" v-show="searchList">
                        <li class="search-item" v-for="(item,index) in searchList" @click="onClickOfSearchItem(item.title)">{{item.title}}</li>
                    </ul>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {BASE_URL,deBounce} from "../../../global/util";
    import jwt_decode from "jwt-decode";
    export default {
        name: "Header",
        data(){
            return{
                keyWord:'',
                tags:[],
                user:'',
                searchList:[]
            }
        },
        computed:{
        },
        methods:{
            test(){
                console.log("test");
            },
            onClickForExit(){
                localStorage.removeItem('blogFrontToken')
                this.user = null
            },
            onClickForGoToEdit(){
                if (this.user){
                    this.$router.push('/edit')
                } else {
                    this.$router.push('/login')
                }
            },
            async getAllTags(){
                let {status,data:{tags}} = await this.$http.get(BASE_URL+'/api/tag/getAllTags')
                this.tags = tags
                 this.$store.commit('setTagList',tags)
            },
            goToCategoryByKeyWord(){
                this.$router.push({
                    name:'category',
                    query:{
                        keyWord:this.keyWord,
                        pageIndex:1
                    }
                })
            },
            onClickOfSearchItem(searchItem){
                this.keyWord =  searchItem
                this.$nextTick(()=>{
                    this.searchList = []
                })
            },
            async getSearchListBykeyWord(){
                let {status,data:{titleList}} = await this.$http.get(encodeURI(BASE_URL+'/api/article/getTitleListByKeyWord?keyWord='+this.keyWord))
                this.searchList = titleList
            },
            // 防抖函数
            // deBounce: (function () {
            //     let timer = 0;
            //     return function(callback, ms) {
            //         clearTimeout(timer);
            //         timer = setTimeout(callback, ms);
            //     };
            //
            // })()
        },
        created(){
            this.getAllTags()
           if (localStorage.getItem('blogFrontToken')){
               const token = localStorage.blogFrontToken;
               // 解析token
               this.user = jwt_decode(token);
           }
           this.GetSearchList = deBounce()
        },
        watch:{

            keyWord(val){
                if (val.trim() !== ''){
                    console.log('有了');
                    console.log(val);
                    this.GetSearchList(this.getSearchListBykeyWord,1000)
                }else{
                    console.log("没有");
                    this.searchList = []
                }

            },


        }

    }
</script>

<style scoped lang="scss">
    $type: screen;
    $maxproto: max-width;
    $minproto: max-width;
    $maxvalue: 800px;
    $minvalue: 481px;
    .header{
        z-index: 99;
        background-color: #222;
        width: 100%;
        height: 52px;
        position: fixed;
        top: 0;
        bottom: 0;
        .navbar{
            width: 85%;
            height: 52px;
            /*background-color: red;*/
            margin-left: 50%;
            transform: translate(-50%);
            display: flex;
            flex-direction: row;
            .log{
                flex: 0.7;
            }
            .nav{
                flex: 2;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                /*justify-items: center;*/
                justify-content: space-between;

                .menu-item{
                    width: 10%;
                    height: 100%;
                    line-height: 50px;
                    text-align: center;
                    transition: all .5s;
                    position: relative;
                    &.menu-item::after{
                        content: '';
                        width: 100%;
                        height: 4px;
                        border: 1px solid #000;
                        background: white;
                        position: absolute;
                        left: 0;
                        top:90%;
                        transition: transform 0.5s;
                        transform: scaleX(0);
                        transform-origin: right;
                    }
                    a{
                        text-decoration: none;
                        color: #eee;
                        font-size: 14px;
                        font-weight: lighter;
                        line-height: 100%;

                        /*width: 100%;*/
                        /*height: 100%;*/
                        display: inline-block;

                    }

                    &:hover{
                        /*background-color: gray;*/
                        cursor: pointer;
                        .submenu-item{
                            display: block;

                        }
                        &::after {
                            transform: scaleX(1);
                            transform-origin: left;
                        }
                    }

                    .submenu-item{
                        transition: all .5s;
                        background-color: gray;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        a{
                            font-size: 12px;
                        }
                        display: none;
                        &:hover{
                            background-color:green;
                        }

                        .submenu{
                            transition: all .5s;
                        }
                    }
                }


            }
            .pull-right{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .form-search{
                    height: 60%;
                    display: flex;
                    border-radius: 20px;
                    border: 1px solid #000;
                    width: 230px;
                    align-items: center;
                    justify-content: space-around;
                    background-color: #fff;
                    .search-input{
                        height: 20px;
                        border:none;
                        background-color: transparent;
                        outline: none;
                        font-size: 12px;
                    }
                    .searchbtn{
                        background: none;
                        border: none;
                        &.el-icon-search{
                            font-size: 14px;
                            font-weight: bolder;
                        }
                    }
                    .search-list{
                        width: 100%;
                        text-align: center;
                        position: absolute;
                        left: 0;
                        top: 35px;
                        background-color: white;
                        border-radius: 5px;
                        .search-item{
                            height: 30px;
                            line-height: 30px;
                            font-size: 20px;
                            cursor: pointer;
                            &:hover{
                                background-color: honeydew;
                            }
                        }
                    }
                }
            }

            @media screen and (min-width: 978px) {
                .el-menu{
                    display: none;
                }
            }
            @media  screen and (min-width:730px) and (max-width: 978px) {
                .nav{
                    display: none;
                }
                .el-menu{
                    display: none;
                }
            }
            @media  screen and (max-width: 730px) {
                .el-menu{
                    display: block;
                    background-color: transparent;
                    border: none;
                }
                .nav{
                    display: none;
                }
                .pull-right{
                    display: none;
                    /*width: 30px;*/
                }
            }
        }





    }




</style>
