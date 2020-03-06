<template>
    <div class="comment">
        <div class="comment-box-wrapper">

            <div class="comment-speaking">
                <div v-if="user" @click="emitForShowDrawer">
                    <img class="login-box" :src="user.cover?imgUrlFormat(user.cover):'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1867624851,2535282636&fm=26&gp=0.jpg'" alt="">
                </div>
                <router-link v-else :to="{name:'login'}" class="login-box">登陆</router-link>
                <textarea name="" id="" placeholder="来说两句吧" v-model="inputOfComment"></textarea>
            </div>
            <div class="comment-submit-wrapper">
                <span></span>
                <span class="comment-btn" @click="clickForSendComment"></span>
            </div>
        </div>
        <div class="comment-total" v-if="comments">
            <span class="comment-title">评论</span>
            <p v-if="countOfSpeacker"><span>{{countOfSpeacker}}</span>人参与,<span>{{countOfComment}}</span>条评论</p>
        </div>
        <!--<el-drawer-->
                <!--title="我是标题"-->
                <!--:visible.sync="isShowDrawer"-->
                <!--:direction="rtl"-->
                <!--:before-close="closeDrawer">-->
            <!--<span>我来啦!</span>-->
        <!--</el-drawer>-->

    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";
    import jwt_decode from "jwt-decode";

    export default {
        name: "Comment",
        props:['comments'],
        data(){
            return{
                inputOfComment:'',
                countOfSpeacker:0,
                user:'',
                countOfComment:0
                // isShowDrawer:false
            }
        },

        computed:{
        },
        methods:{
            getCountOfSpeaker(){
                console.log("dsadsa");
                console.log(this.comments);
                if (this.comments){
                    console.log("tian");
                    console.log("tian");
                    console.log("tian");
                    let Speakers = []
                    let countOfComment = 0
                    console.log(this.comments);
                    this.comments.forEach(item=>{
                        countOfComment+=item.discuss.subDiscuss.length
                        Speakers.push(item.discuss.username)
                        item.discuss.subDiscuss.forEach(subitem=>{
                            Speakers.push(subitem.selfName)
                        })
                    })
                    countOfComment+=this.comments.length;
                    console.log(Speakers);
                    let newSpeackers = Array.from(new Set(Speakers))
                    this.countOfSpeacker = newSpeackers.length
                    this.countOfComment = countOfComment
                }
            },
            // getCoverUrl(url){
            //     if (!url)
            //         return''
            //     return BASE_URL+url;
            // },
            async emitForShowDrawer(){
                console.log("触发子组件");
                // let userInfo = await this.$axios.get('/users/getUser');
                // console.log(userInfo);
                let targetUserId = this.user._id
                this.$emit('onclickForShowDrawer',targetUserId)
            },

            clickForSendComment(){
                if(!this.user){
                    this.$router.push('/login');
                    return;
                }
                let _this = this
                if (!this.inputOfComment){
                    alert('评论不能为空');
                    return
                }
                let newDiscuss  = {
                    username:this.user.username,
                    userId:this.user._id,
                    inputOfComment:this.inputOfComment,
                    cover:this.user.cover,
                    subDiscuss:[]
                }
                this.$http.post(BASE_URL+'/api/comment/addComment',{
                    articleID:_this.$route.query.articleID,
                    newDiscuss
                })
                    .then(({status,data})=>{
                        console.log('添加评论');
                        console.log(status);
                        if (status===200){
                            this.$emit('updateComment')
                        }
                    })
            }
        },
        mounted(){
            // this.getUser()

            const token = localStorage.blogFrontToken;
            // 解析token
            this.user = jwt_decode(token);
            // console.log(this.user);
            console.log("我在comment created");
            console.log(this.comments);
            this.getCountOfSpeaker()
        }
    }
</script>

<style scoped lang="scss">
.comment{
    margin-top: 30px;
    padding: 15px;
    box-sizing: border-box;
    .comment-box-wrapper{
        /*width: 90%;*/

        .comment-speaking{
            padding: 20px 10px;
            box-sizing: border-box;
            height: 100px;
            width: 100%;
            border: 1.1px solid #e64851;
            border-radius: 10px;

            position: relative;
            /*overflow: hidden;*/
            border-top: none;
            background-image: url("img/border-t.png");
            background-position: 5px 0px;
            background-repeat: no-repeat;


            .login-box{
                position: absolute;
                left: 8px;
                top: -35px;
                width: 35px;
                height: 35px;
                font-size: 13px;
                border-radius: 50%;
                border: 1px solid #d43f3a;
                text-align: center;
                line-height: 35px;
                color: #d43f3a;
            }
            textarea{
                width: 100%;
                height: 100%;
                resize: none;
                background: none;
                outline: none;
                border: none;
            }


        }
        .comment-submit-wrapper{
            margin-top: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            box-sizing: border-box;
            padding-right: 10px;
            span:first-child{
                cursor: pointer;
                width: 20px;
                height: 20px;
                background-image: url("img/face.png");
                background-repeat: no-repeat;
                &:hover{
                    background-image: url("img/face-active.png");
                }
            }
            span:last-child{
                cursor: pointer;
                width: 102px;
                height: 30px;
                background-image: url("img/post-btn.png");
                background-repeat: no-repeat;
                background-size: cover;
                &:hover{
                    opacity: .8;
                }
            }
        }
    }
    .comment-total{
        margin-top: 30px;
        color: #e74851;
        display: flex;
        justify-content: space-between;

        .comment-title{
            background-image: url("img/cmtlist-bg-active.png");
            background-size: cover;
            font-size: 14px;
            width: 4rem;
            text-align: center;
            height: 20px;
            line-height: 20px;
            padding: 5px;
            box-sizing: border-box;
        }
        p{
            flex: 1;
            height: 20px;
            text-align: right;
            border-bottom:1px solid #e74851;
            span{
                font-weight: bolder;
                font-size: 20px;
            }
        }
    }


}
</style>
