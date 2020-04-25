<template>
    <div class="album">
        <div class="container">
            <div class="masonry">
                <div class="item" v-for="(item,index) in imglist" :key="index">
                    <img :src=item.url alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "album",
        data(){
            return {
                imglist:[



                ]
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss" >
    .album{

        width: 100%;
        min-height: 100%;
        background-color: #f1f1f1;
        .container{
            margin-top: 55px;
            /*margin-bottom: 10px;*/
            width: 85%;
            height: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
            .masonry {
                -moz-column-count:3; /* Firefox */
                -webkit-column-count:3; /* Safari 和 Chrome */
                column-count:4;
                -moz-column-gap: 1em;
                -webkit-column-gap: 1em;
                column-gap: 1em;
                margin:2em auto;
                width: 100%;
                .item {
                    padding: 1em;
                    margin-bottom: 2em;
                    -moz-page-break-inside: avoid;
                    -webkit-column-break-inside: avoid;
                    break-inside: avoid;
                    /*background: #f60;*/
                    img{
                        width: 100%;
                        box-shadow: 0 0 1rem #000000;
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
                .masonry{
                    column-count:3;
                }

            }

        }
        @media  screen and (max-width: 730px) {
            .container{
                width: 100%;
                .masonry{
                    column-count:2;
                }
            }
        }

    }
</style>
