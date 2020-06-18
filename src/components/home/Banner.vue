<template>

    <div class="block">
        <el-carousel trigger="click">
            <el-carousel-item v-for="(item,index) in imgs" :key="index">
                <el-image
                        style="display: block"
                        :src="item.imgUrl"
                        fit="fit">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <!--<img :src="item.url" alt="">-->
            </el-carousel-item>


        </el-carousel>

    </div>

</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Banner",
        data(){
            return{
                imgs:[
                    {imgUrl:'http://news.mydrivers.com/img/20110128/03383685.jpg'},
                    {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583423620856&di=6266ecfe2984e8dacf0a513f413fb3b3&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1212%2F26%2Fc2%2F16899702_1356495029899.jpg'},
                    {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2368005470,2296787642&fm=26&gp=0.jpg'},
                ]
            }
        },
        methods:{
            formUrl(url){
                return `http://101.37.32.66/${url}`
                // return 'http://localhost:5000/upload_ad3af0334b16d6ce4a43b15642644c3a.jpg'
            },
        },
        async mounted(){
            // let banner = await this.$http.get('http://101.37.32.66:5000/api/banner/getBanner')
            // console.log(banner.data.banner);
            // if(banner.data.banner){
            //     this.imgs = banner.data.banner
            //     console.log(this.imgs);
            // }else {
            //     console.log("没有轮播图");
            // }
        }
    }
</script>

<style  lang="scss">
    .block{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        .el-carousel{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            .el-carousel__container{
                width: 100%;
                height: 100%;
                border-radius: 10px;
                .el-carousel__item{
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
            }
        }

    }


</style>
