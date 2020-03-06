<template>
    <div class="Feeling">
        <div class="feeling-tip">看完此文章，你的心情是</div>
        <ul class="feeling-emoji">
            <li class="emoji-item" @click.once="onClickForIncrease(1)">
                <img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/13.gif" alt="">
                <p>赞</p>
                <p>{{praise}}人</p>
            </li>
            <li class="emoji-item" @click.once="onClickForIncrease(2)">
                <img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/1.gif" alt="">
                <p>鼓掌</p>
                <p>{{applaud}}人</p>
            </li>
            <li class="emoji-item" @click.once="onClickForIncrease(3)">
                <img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/8.gif" alt="">
                <p>草泥马</p>
                <p>{{caonima}}人</p>
            </li>
            <li class="emoji-item" @click.once="onClickForIncrease(4)">
                <img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/10.gif" alt="">
                <p>愤怒</p>
                <p>{{angry}}人</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Feeling",
        props:['praise','applaud','caonima','angry','articleID'],
        methods: {
            IncreaseFeeling(msg,type){
                let _this = this
                this.$http.post(BASE_URL+'/api/article/increaseFeelingOfArticle',{
                    articleID: this.articleID,
                    attrName:type
                })
                    .then(({status})=>{
                        if (status===200){
                            _this.$emit('updateFeelingData');
                            console.log(_this);
                            // _this.$router.go(0)
                            this.$message({
                                dangerouslyUseHTMLString: true,
                                type: 'success',
                                message:msg
                            });

                        }else {
                            this.$message({
                                dangerouslyUseHTMLString: true,
                                type: 'fail',
                                message:'操作失败'
                            });
                        }
                    })
            },
            onClickForIncrease(index){
                switch (index) {
                    case 1:

                        this.IncreaseFeeling( '<img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/13.gif">' +
                            `<h1>漂亮，您狠狠地点赞成功！</h1>`,'praise')
                        break;
                    case 2:
                        this.IncreaseFeeling('<img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/1.gif">' +
                            `<h1>天空中响起雷鸣般的掌声</h1>`,'applaud')
                        break;
                    case 3:
                        this.IncreaseFeeling( '<img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/8.gif">' +
                            `<h1>一万只草泥马蹦蹦跳跳真可爱</h1>`,'caonima')
                        break;
                    case 4:
                        this.IncreaseFeeling('<img src="http://comment.news.sohu.com/upload/comment4_1/images/face2013/10.gif">' +
                            `<h1>置酒欲饮；悲来填膺，好诗</h1>`,'angry')
                        break;
                }


            }
        }
    }
</script>

<style scoped lang="scss">
    .Feeling{
        margin-top: 50px;
        .feeling-tip{
            height: 20px;
            border-bottom: 1px solid #e6e6e6;
        }
        .feeling-emoji{
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            .emoji-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 10px;
                p{
                    height: 30px;
                    line-height: 30px;
                }
                p:last-child{
                    color: #ff065e;
                    font-size: 12px;
                }
                &.emoji-item:hover{
                    box-shadow: 0px 0px 5px #888888;

                    /*border: 1px solid #000;*/
                }
            }
        }

        @media screen and (min-width: 978px) {

        }
        @media  screen and (min-width:730px) and (max-width: 977px) {
            /*feeling-emoji*/

        }
        @media  screen and (max-width: 730px) {

        }

    }

</style>
