<template>
    <div class="person-speak">
        <h4 class="speak-tip"> 最新评论</h4>
        <!--<h4 class="speak-tip"> {{comments}}</h4>-->
        <!--<h4 class="speak-tip"> {{// comments.discuss}}</h4>-->
        <ul class="person-list" v-if="comments">
            <li class="person-item" v-for="(item,index) in comments" :key="index">
                <div class="first-comment">
                    <img  class="person-avatar" :src="item.discuss.cover?imgUrlFormat(item.discuss.cover):'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1867624851,2535282636&fm=26&gp=0.jpg'" alt="" @click="emitForShowDrawer(item.discuss.userId)">
                    <div class="person-right">
                        <div class="person-name-and-time">
                            <div class="person-name">{{item.discuss.username}}</div>
                            <div class="person-time">{{item.time|formatTime()}}</div>
                        </div>
                        <div class="person-message">
                            {{item.discuss.inputOfComment}}
                        </div>
                        <div class="person-callback">
                            <el-popover
                                    placement="left-start"
                                    title="回复"
                                    width="300"
                                    trigger="click"
                                    content="你想回复什么呢？请尽情输入吧。">
                                <!--<el-button slot="reference">click 激活</el-button>-->
                                <div>
                                    <h3 style="margin-bottom: 30px">你想回复什么呢？请尽情输入吧。</h3>
                                    <el-input v-model="inputOfRecall" placeholder="尽情回复吧" style="margin-bottom: 70px"></el-input>
                                    <el-button type="primary" plain style="position: absolute;right: 30px;bottom: 15px" @click="onClickForSendRecall(item.discuss.username,item.discuss.userId,item._id)">确定</el-button>
                                </div>
                                <el-button class="callback" slot="reference" style="border: none;outline: none">回复</el-button>
                            </el-popover>
                            <span class="good"><i class="iconfont icon-good"></i></span>

                            <span class="bad"><i class="iconfont icon-bad"></i></span>
                            <span class="chater"><i class="iconfont icon-shoucang"></i></span>
                        </div>
                    </div>
                </div>
                <!--{{item.discuss.subDiscuss}}-->
                <div class="sub-comment" v-if="item.discuss" v-for="(subitem,index) in item.discuss.subDiscuss" :key="index">

                    <img  class="person-avatar" :src="subitem.cover?imgUrlFormat(subitem.cover):'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1867624851,2535282636&fm=26&gp=0.jpg'" alt=""  @click="emitForShowDrawer(subitem.selfId)">

                    <div class="person-right">
                        <div class="person-name-and-time">
                            <div class="person-name">{{subitem.selfName}} <span style="color: gray">回复</span> {{subitem.targetName}}</div>
                            <div class="person-time">{{subitem.time|formatTime()}}</div>
                        </div>
                        <div class="person-message">
                            {{subitem.inputOfRecall}}
                        </div>

                        <div class="person-callback">
                            <el-popover
                                    placement="left-start"
                                    title="回复"
                                    width="300"
                                    trigger="click"
                                    content="绑定合适的话题，能方便分类检索，文章也更容易让读者发现。">
                                <!--<el-button slot="reference">click 激活</el-button>-->
                                <div>
                                    <h3 style="margin-bottom: 30px">你想回复什么呢？请尽情输入吧。</h3>
                                    <el-input v-model="inputOfRecall" placeholder="请输入" style="margin-bottom: 70px"></el-input>
                                    <el-button type="primary" plain style="position: absolute;right: 30px;bottom: 15px" @click="onClickForSendRecall(subitem.selfName,subitem.userId,item._id)">确定</el-button>
                                </div>
                                <el-button class="callback" slot="reference" style="border: none;outline: none">回复</el-button>
                            </el-popover>

                            <span class="good"><i class="iconfont icon-good"></i></span>

                            <span class="bad"><i class="iconfont icon-bad"></i></span>
                            <span class="chater"><i class="iconfont icon-shoucang"></i></span>
                        </div>
                    </div>
                </div>


            </li>
        </ul>
        <div v-else style="margin: 0 auto;text-align: center">
            <img src="http://pic.90sjimg.com/design/00/93/88/11/5905a3b6cf4c4.png%21/fwfh/804x734/quality/90/unsharp/true/compress/true" alt="" style="width: 200px">
            <p style="font-weight: bolder">小羊提醒：暂时还没有评论哦，快来抢沙发吧！</p>
        </div>

    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";
    import jwt_decode from "jwt-decode"
    export default {
        name: "PersonSpeak",
        props:['comments'],
        data(){
            return{
                commentLength:0,
                inputOfRecall:'',
                user:''
            }
        },
        created(){
            const token = localStorage.blogFrontToken;
            // 解析token
            this.user = jwt_decode(token);
        },
        methods:{
            async emitForShowDrawer(targetUserId){
                // let userInfo = await this.$axios.get('/users/getUser');
                // console.log(userInfo);
                this.$emit('onclickForShowDrawer',targetUserId)
            },
            onClickForSendRecall(username,userId,_id){
                if (!this.user)
                    this.$router.push('/login')
                let _this = this

                // console.log(userId);
                this.$http.post(BASE_URL+'/api/comment/addRecall',{
                    articleID:_this.$route.query.articleID,
                    targetName:username,
                    cover:_this.user.cover,
                    selfId:_this.user._id,
                    selfName:_this.user.username,
                    _id,
                    inputOfRecall:_this.inputOfRecall,
                    time:new Date().getTime()
                }).then(({status})=>{
                    if (status===200){
                        alert('评论成功')
                        this.$emit('updateComment')
                    }
                })
            }
        },
        mounted(){
        }

    }
</script>

<style scoped lang="scss">
.person-speak{
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    .speak-tip{
        color: #d43f3a;
        font-size: 14px;
        &::before{
            content: '';
            border: 3px solid #d43f3a;
            border-radius: 2px;
            margin-right: 5px;
        }
    }
    .person-list{

        .person-item{
            border-bottom: 1px solid #fdfdfe;
        }
        .first-comment{
            position: relative;
            box-sizing: border-box;
            margin-top: 10px;
            display: flex;
            padding-bottom: 10px;
            .person-avatar{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .person-right{
                margin-left: 20px;
                .person-name-and-time{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .person-name{
                        margin-top: 10px;
                        font-size: 12px;
                        color: #d43f3a;
                    }
                    .person-time{
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-top: 10px;
                        font-size: 10px;
                        color: #737373;
                    }

                }
                .person-message{
                    margin-top: 20px;
                    line-height: 30px;
                    font-size: 14px;
                }
                .person-callback{
                    display: none;
                    position: absolute;
                    right: 5px;
                    bottom: 5px;
                    align-items: right;
                    text-align: right;
                    margin-top: 10px;

                    span{
                        cursor: pointer;
                        color: #999;
                        font-size: 13px;
                        font-weight: bolder;
                        margin-left: 15px;
                        &:hover{
                            color: #d43f3a;
                        }
                    }
                }
            }
            &:hover .person-callback{
                display: block;
            }

        }
        .sub-comment{
            /*background-color: gray;*/
            padding-left: 70px;
            box-sizing: border-box;

            position: relative;
            margin-top: 10px;
            display: flex;
            padding-bottom: 10px;
            &:before{
                position: absolute;
                left: 60px;
                top: 0px;
                content: '';
                background-color: red;
                width: 5px;
                height: 30px;
            }
            .person-avatar{

                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            .person-right{
                margin-left: 20px;
                .person-name-and-time{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .person-name{
                        margin-top: 10px;
                        font-size: 12px;
                        color: #d43f3a;
                    }
                    .person-time{
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-top: 10px;
                        font-size: 10px;
                        color: #737373;
                    }

                }
                .person-message{
                    margin-top: 20px;
                    line-height: 30px;
                    font-size: 14px;
                }
                .person-callback{
                    display: none;
                    position: absolute;
                    right: 5px;
                    bottom: 5px;
                    align-items: right;
                    text-align: right;
                    margin-top: 10px;

                    span{
                        cursor: pointer;
                        color: #999;
                        font-size: 13px;
                        font-weight: bolder;
                        margin-left: 15px;
                        &:hover{
                            color: #d43f3a;
                        }
                    }
                }
            }
            &:hover .person-callback{
                display: block;
            }
        }
    }
}

.callback{
    background: none!important;
    outline: none!important;
    padding: 0;
    font-size: 13px!important;
    font-weight: bolder;
    &:hover{
       color: #d43f3a; ;
    }
}
</style>
