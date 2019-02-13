<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            class="shop-list-info"
    >
        <router-link :to="{path:'shop'}" tag='div' class="van-card" v-for="item in list" :key="item">
            <div class="van-card__thumb">
                <img :src="imageURL" alt="">
            </div>
            <hgroup class="van-card__content">
                <header class="van-card__title">
                    <section class="van-card__title-txt">
                        <van-tag color="#7232dd" text-color="#7232dd" size="medium">标签</van-tag>
                        <h4>效果演示</h4>
                    </section>
                    <ul class="van-card__title-ul">
                        <li>保</li>
                        <li>准</li>
                        <li>票 </li>
                    </ul>
                </header>
                <h5 class="van-card__desc1">
                    <div class="rating_order_num_left">
                        <van-rate v-model="3.2" class="rating-star" :size="12"/>
                        <div class="rating-num">3.7</div>
                        <div class="order-txt">月售106单</div>
                    </div>
                    <div class="rating_order_num_right">
                        <span class="delivery_style delivery_left"><span class="delivery_txt">蜂鸟专送</span></span>
                        <span class="delivery_style delivery_right"><span class="delivery_txt">准时达</span></span>
                    </div>
                </h5>
                <h5 class="van-card__bottom">
                    <div class="van-card__price">
                        ¥20起送
                        <span>/</span>
                        配送费约¥5
                    </div>
                    <div class="van-card__num">
                        <span>2102.3公里</span>
                        <span>/</span>
                        <span>24小时14分钟</span>
                    </div>
                </h5>
            </hgroup>
        </router-link>

    </van-list>
</template>
<script>
    export default{
        data(){
            return{
                list: [],
                loading: false,
                finished: false,
                error: false,
                imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
            }
        },
        mounted(){
            this.onLoad()
        },
        methods:{
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;
                    console.log(this.list)
                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 500);


            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/style/mixin";
    .van-card{
        padding-left: 90px;
        padding-right: 10px;
        &__thumb{
             width: 70px;
             height: 70px;
             left: 10px;
         }

        &__content {
             font-size: 8px;
             flex-direction: column;
            h5{
                margin:10px 0 0 0;
            }
            .van-card__title,.van-card__desc1,.van-card__bottom{
                display: flex;
                justify-content:space-between;

            }

        }

        &__title{
            align-items: center;
            h4{
                margin: 0 0 0 2px;
            }
            &-txt{
                 display: flex;
                 align-items: center;
                 justify-content: flex-start;
                .van-tag{
                    padding: 1px 2px;
                }
            }
            &-ul{
                 display: flex;
             }

        }
        &__desc1{
             font-size: 10px;
            .rating_order_num_left{
                .fj(flex-start);
                .rating-num{
                    color: #ff8412;
                }
                .rating-star,.order-txt{

                    transform: scale(.8);
                }
                .van-rate__item{
                    padding:0 0;
                }
            }
            .rating_order_num_right{
                .fj(flex-end);
                    align-items: center;
                    transform: scale(.8);
                    margin-right: -11.2px;
                .delivery_style{
                    padding:1px 1px;
                   .border-radius(4px);
                }
                .delivery_left{
                    color: #fff;
                    background-color: #3190e8;
                    border: 1px solid #3190e8;
                }
                .delivery_right{
                    color: #3190e8;
                    border: 1px solid #3190e8;
                }
            }
        }
        &__price,&__num{
          transform: scale(.9);
          .sc(12px, #666)
        }
    }


</style>