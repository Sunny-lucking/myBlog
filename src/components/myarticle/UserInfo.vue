<template>
    <div class="user-info">
        <div class="user-top">
            <img style="width: 100px;height: 100px;border-radius: 50%;border: 2px solid white" :src="imgUrlFormat(targetUser.cover)?imgUrlFormat(targetUser.cover):'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1867624851,2535282636&fm=26&gp=0.jpg'" alt="">
            <!--<div style="width: 100px;height: 100px;border-radius: 50%;border: 2px solid white" ></div>-->
            <div class="name-and-mail">
                <h3 class="mail">{{targetUser.email}}</h3>
                <h3 class="name">{{targetUser.username}}</h3>
            </div>
            <!--<i class="el-icon-arrow-right" style="cursor: pointer"></i>-->
        </div>
        <el-tabs @tab-click="handleClick" stretch v-model="activeName">
            <el-tab-pane label="相册" name="first">
                <div class="album">
                    <div class="container">
                        <div class="masonry" v-if="selfAlbum.length>0">
                            <div class="item" v-for="(item,index) in selfAlbum" :key="index">
                                <img :src="imgUrlFormat(item.url)" alt="">
                            </div>

                        </div>
                        <div v-else style="margin: 30px auto;text-align: center">
                            <img src="http://pic.90sjimg.com/design/00/93/88/11/5905a3b6cf4c4.png%21/fwfh/804x734/quality/90/unsharp/true/compress/true" alt="" style="width: 200px">
                            <p style="font-weight: bolder">小羊提醒：这位同学很害羞，没有照片</p>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="上传照片" name="second">
                <div class="upload-album" style="padding: 30px">
                    <el-upload
                            ref="upload"
                            :action="imgUrlFormat('api/album/addAlbum')"
                            list-type="picture-card"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :data="{userId}"
                            :on-success="handleAlbumSuccess"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">

                    </el-dialog>
                    <el-button style="margin-left: 10px;margin-top: 20px" size="small" type="success" @click="submitUpload">点击上传</el-button>

                </div>
            </el-tab-pane>
            <el-tab-pane label="更换头像" name="third">
                <div class="upload-album" style="padding: 30px">
                    <el-upload
                            ref="uploadOfAvatar"
                            :action="imgUrlFormat('api/album/changeAvatar')"
                            list-type="picture-card"
                            :data="{userId}"
                            :on-success="handleAlbumSuccessOfAvatar"
                            >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!--<el-dialog :visible.sync="dialogVisible">-->
                        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                    <!--</el-dialog>-->
                    <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--:on-preview="handlePreview"-->
                    <!--:on-remove="handleRemove"-->
                    <!--:file-list="fileList"-->
                    <!--list-type="picture">-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    <!--</el-upload>-->
                </div>
            </el-tab-pane>
            <el-tab-pane label="xxxx" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    // import config from "../../static/config"
    import {BASE_URL} from "../../global/util";

    export default {
        name: "UserInfo",
        props:['targetUserId','userId'],
        data(){
            return {
                activeName: 'first',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                dialogImageUrl: '',
                dialogVisible: false,

                // userId:JSON.parse(localStorage.getItem('userId')),
                selfAlbum:'',
                targetUser:''

            }
        },
        methods:{
            getTargetUser(){
                let _this =this;
                this.$http.get(BASE_URL+'/api/user/getOneUser?userId='+this.targetUserId)
                    .then((res)=>{

                        _this.targetUser = res.data.user[0];
                        console.log("_this.targetUser"+_this.targetUser);
                        console.log(_this.targetUser);
                    })
            },
            getUser(){
                console.log("我在mounted");
            },
            getCoverUrl(url){
                if (!url)
                    return'';
                return BASE_URL+'/xiance/'+url;
            },
            getAlbums(){
                let _this = this;
                console.log("getAlbums");
                // console.log(user);
                //    获取相册
                this.$http.get(BASE_URL+'/api/album/getAlbum?userId='+this.targetUserId)
                    .then((res)=>{
                            _this.selfAlbum = res.data.result
                    })

            },
            albumPath(url){
                if (!url)
                    return''
                return `/xiance/${url}`;
            },
            handleAlbumSuccess(){
                // this.$router.go(0)
                this.$refs.upload.clearFiles();
                this.$notify({
                    title: '上传成功',
                    // message: '这是一条成功的提示消息',
                    type: 'success'
                });
            },
            handleAlbumSuccessOfAvatar(){
                this.$refs.uploadOfAvatar.clearFiles();
                this.$notify({
                    title: '修改成功',
                    // message: '这是一条成功的提示消息',
                    type: 'success'
                });
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleClick(tab, event) {
                if (tab.index===0){
                    this.getAlbums();
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        watch:{
            targetUserId(newValue,oldValue){
                this.getTargetUser();
                this.getAlbums();
            },
            activeName(newValue,oldValue){
                console.log(oldValue);
                console.log(newValue);
                if (newValue==='first'){
                    this.getAlbums();
                }
            }
        },
        mounted(){
            this.getTargetUser();
            this.getAlbums();
            // this.getUser();
        },
    }
</script>

<style scoped lang="scss">
.user-info {
    width: 100%;
    height: 100%;
    .user-top {
        position: relative;
        background-color: #1aad19;
        padding: 30px;
        display: flex;
        align-items: center;
        .name-and-mail {
            color: white;
            margin-left: 20px;
            font-weight: bolder;
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content: space-around;*/
            .mail {
                margin-bottom: 20px;
            }
        }
        i {
            position: absolute;
            right: 30px;
            font-weight: bolder;
            color: white;
            font-size: 20px;
        }
    }
    .album {

        width: 100%;
        /*min-height: 100%;*/
        height: 73vh;
        overflow-y: scroll;
        background-color: #f1f1f1;
        .container {
            /*margin-top: 55px;*/
            /*margin-bottom: 10px;*/
            width: 85%;
            height: 100%;
            /*overflow-y: scroll;*/
            margin-left: 50%;
            transform: translateX(-50%);
            .masonry {
                -moz-column-count: 3; /* Firefox */
                -webkit-column-count: 3; /* Safari 和 Chrome */
                column-count: 2;
                -moz-column-gap: 1em;
                -webkit-column-gap: 1em;
                column-gap: 0.1em;
                margin: 0em auto;
                width: 100%;
                .item {
                    padding: 1em;
                    /*margin-bottom: 2em;*/
                    -moz-page-break-inside: avoid;
                    -webkit-column-break-inside: avoid;
                    break-inside: avoid;
                    /*background: #f60;*/
                    img {
                        width: 100%;
                        box-shadow: 0 0 1rem #000000;
                    }
                }
            }

        }

        /*@media screen and (min-width: 978px) {*/
            /*.container {*/
                /*width: 85%;*/
                /*height: 100%;*/

            /*}*/
        /*}*/
        /*@media screen and (min-width: 730px) and (max-width: 977px) {*/
            /*.container {*/
                /*width: 100%;*/
                /*.masonry {*/
                    /*column-count: 3;*/
                /*}*/

            /*}*/

        /*}*/
        /*@media screen and (max-width: 730px) {*/
            /*.container {*/
                /*width: 100%;*/
                /*.masonry {*/
                    /*column-count: 2;*/
                /*}*/
            /*}*/
        /*}*/

    }
}

</style>
<style>
    .el-tabs__header{
        margin: 0;
    }
</style>
