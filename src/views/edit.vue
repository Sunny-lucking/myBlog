<template>
    <div class="edit">
        <!-- use with components - bidirectional data binding（双向数据绑定） -->
       <div class="container">
           <div class="content-title">
               <div class="input-wrapper">
                   <input type="text" placeholder="在这里输入标题" v-model="title">
               </div>
               <div style="height: 100px;width:100%;position: relative;cursor: pointer" class="image-wrapper">
                   <el-image
                           style="width: 100%; height: 100%"
                           :src="cover"
                           fit="cover"></el-image>
                   <!--<img :src="cover" alt="" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;">-->
                   <div class="mask" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;">
                       <i class="el-icon-upload" style="width: 100%;height: 100%;color: #cccccc"></i>
                   </div>
                   <input type="file" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;opacity: 0" class="input-image" @change="upLoadImage" ref="imageInput">
               </div>

               <!--<div class="upload-wrapper">-->
                   <!--<button>点击选择封面</button>-->
                   <!--<input type="file" placeholder="未选择封面" class="file" ref="file" value="上传封面" @change="changeImg">-->
               <!--</div>-->
               <el-input
                       type="textarea"
                       placeholder="摘要:"
                       v-model="valueOfSummary"
                       maxlength="60"
                       show-word-limit
                       style="font-weight: bolder;margin-top: 20px"
               >
               </el-input>
               <el-popover
                       placement="left-start"
                       title="发表文章"
                       width="300"
                       trigger="click"
                       content="绑定合适的话题，能方便分类检索，文章也更容易让读者发现。">
                   <!--<el-button slot="reference">click 激活</el-button>-->
                   <div>
                       <h3 style="margin-bottom: 30px">绑定合适的话题，能方便分类检索，文章也更容易让读者发现。</h3>
                       <el-input v-model="tag" placeholder="请输入该篇文章的标签" style="margin-bottom: 70px"></el-input>
                       <el-button type="primary" plain style="position: absolute;right: 30px;bottom: 15px" @click="onClickForAddArticle">确定</el-button>
                   </div>
                   <el-button type="primary"  slot="reference" @click="onClickForAddArticle" style="height: 50px;width: 200px;margin-top: 20px">提交</el-button>
               </el-popover>

           </div>
           <quill-editor ref="myTextEditor"
                                 class="myTextEditor"
                                 v-model="content"
                                 :options ="editorOption"
                                 @blur="onEditorBlur($event)"
                                 @focus="onEditorFocus($event)"
                                 @ready="onEditorReady($event)">
           </quill-editor>

       </div>

        <!--<div v-html="content"></div>-->

    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import jwt_decode from "jwt-decode"
    import { quillEditor } from 'vue-quill-editor'
    import {BASE_URL} from "../global/util";

    export default {
        name: "index",
        components: {
            quillEditor
        },
        watch:{
            fileList(v){
            }
        },
        data () {
            return {
                isHasSetCover:false,
                user:'',
                form_data:null,
                valueOfSummary:'',
                tag:'',
                visible: false,
                title: '',
                content: '<h2>I am Example</h2>',
                editorOption: {
                },
                cover:require('./../assets/image.png'),
                pic:'',
                noticeTrmplate:
                    `
                       <input type="text"/>
                    `
            }
        },

        methods: {
            successOfPublic() {
                this.$message({
                    message: '恭喜你，发表成功',
                    type: 'success'
                });
            },
            failOfPublic() {
                this.$message.error('错了哦，这是一条错误消息');
            },
            isInputEmpty(){
                if(!this.content){
                    this.$message.error('内容不能为空');
                    return false;
                }else if(!this.title){
                    this.$message.error('标题不能为空');
                    return false;
                }else if(!this.valueOfSummary){
                    this.$message.error('摘要不能为空');
                    return false;
                }
                return true
            },
            onClickCheckIfValidate(){
                if (!this.isInputEmpty()){
                    return;
                }
            },
            // onClickForAddArticle(){
            //     if (!this.isInputEmpty()){
            //         console.log("哈哈");
            //         return;
            //     }
            //     this.isInputEmpty();
            //     console.log("hah");
            //     let _this = this
            //     if (!this.input){
            //         this.$message.error('请输入标签');
            //         return;
            //     }
            //
            //     const loading = this.$loading({
            //         lock: true,
            //         text: '正在发表。。。',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     });
            //
            //     this.$axios.post(BASE_URL+"/article/addArticle",{
            //         content: this.content,
            //         title: this.title,
            //         cover: this.fileList[0].url,
            //         username: localStorage.getItem('username'),
            //         userId: localStorage.getItem('userId'),
            //         time: new Date().getTime(),
            //         tagName:this.input,
            //         summary:this.valueOfSummary
            //     }).then(({status})=>{
            //         console.log(status);
            //         loading.close();
            //         if (status===200){
            //             this.successOfPublic();
            //             setTimeout(()=>{
            //               _this.$router.push('/')
            //             },)
            //         } else{
            //             this.failOfPublic()
            //         }
            //     })
            // },

            async onClickForAddArticle(){
                if (!this.isHasSetCover){
                    return alert('请选择封面')
                }
                let _this = this
                if (!this.isInputEmpty) return;
                if (!this.tag){
                        this.$message.error('请输入标签');
                        return;
                    }

                this.form_data.append('title',this.title);
                this.form_data.append('summary',this.valueOfSummary);
                this.form_data.append('tag',this.tag);
                this.form_data.append('content',this.content);
                this.form_data.append('username',this.user.username);
                this.form_data.append('_id',this.user._id);
                let {status,data:{msg,code}} = await this.$http.post(BASE_URL+'/api/article/addArticle',this.form_data,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                if (status===200){
                    if (code===0){
                        this.$message({
                            message: msg,
                            type: 'success'
                        });
                        _this.$router.push('/home')

                    }else {
                        alert(msg)
                    }
                }else {
                    alert(msg)
                }


            },
            upLoadImage(){
                let imageFile = this.$refs.imageInput.files[0]

                let reader = new FileReader();
                reader.readAsDataURL(imageFile);
                let that = this
                reader.onload = function(e) {
                    that.cover = e.target.result
                    that.isHasSetCover = true
                }
                // console.log(this.valueOfSummary);
                this.form_data =new FormData();
                this.form_data.append('image',imageFile);


            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },

        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },

        },
        mounted() {
            // console.log(this.$refs.file.files[0]);
            if (localStorage.getItem('blogFrontToken')) {
                const token = localStorage.blogFrontToken;
                // 解析token
                this.user = jwt_decode(token);
            }

        }
    }
</script>

<style scoped lang="scss">
    .edit{
        margin-top: 60px;
        width: 100%;
        min-height: 100%;
        background-color: #ffffff;
        height: 100%;
        .container{
            height: 80%;
            width: 100%;
            background-color: #ffffff;
            display: flex;
            flex-direction: row;
            .content-title{
                flex:0 0 350px ;
                border-left: 1px solid #737373;

                height: 100%;
                overflow: auto;
                background-color: #f5f7f8;
                padding: 20px;
                box-sizing: border-box;
                .input-wrapper{
                    /*background-color: blue;*/
                    width: 100%;
                    height: 100px;
                    input{
                        height: 100%;
                        width: 100%;
                        background: none;
                        border: none;
                        font-size: 30px;
                        outline: none;
                    }
                    input::-webkit-input-placeholder {
                        color: cornflowerblue;
                    }
                    input::-ms-input-placeholder {
                        color: red;
                    }
                }
                /*.img-wrapper{*/
                    /*width: 100%;*/
                    /*height: 200px;*/
                    /*border: 3px solid #9bd89d;*/
                    /*padding: 20px;*/
                    /*box-sizing: border-box;*/
                    /*background-color: #ffffff;*/
                    /*img{*/
                        /*width: 100%;*/
                        /*height: 100%;*/
                        /*background-color: gray;*/
                    /*}*/
                /*}*/
                .image-wrapper:hover .mask{
                    opacity: 0.6;
                }
                .upload-wrapper{
                    position: relative;
                    display: inline-block;
                    background: #D0EEFF;
                    border: 1px solid #99D3F5;
                    border-radius: 4px;
                    /*padding: px 12px;*/
                    /*overflow: hidden;*/
                    color: #1E88C7;
                    text-decoration: none;
                    text-indent: 0;
                    line-height: 20px;
                    width: 100%;
                    height: 100px;
                    button{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        /*background-color: #1E88C7;*/
                        border: none;
                        background: transparent;
                        font-size: 20px;
                    }
                    .file{
                        position: absolute;
                        /*font-size: 100px;*/
                        right: 0;
                        top: 0;
                        opacity: .1;
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .myTextEditor{
                /*width: 50%;*/
                /*height: 100%;*/
                /*background-color: pink;*/
                /*min-height: 60px;*/
                margin-right: 100px;
                margin-left: 100px;
                height: 100%;
                flex: 1;
            }

        }

    }

    .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        /*cursor: pointer;*/
        text-align: center;
        font-size: 60px;

        .el-icon-upload{
            line-height: 60px;
        }
    }
    .image-wrapper:hover .mask{
        opacity: 0.6;
    }
</style>
