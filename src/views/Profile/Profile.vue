

<template>
    <div class="cube-page scroll-nav-side">

        <div class="wrapper">
                <div class="shop-nav">
                    <div class="shop-nav-content">
                        <nav>
                            <router-link :to="{ path: 'goods' }"><</router-link>
                        </nav>
                        <div class="shop-summary">
                            <div class="shop-summary-img">
                                <span class="logoBg"><span class="logoTxt">品牌</span></span>
                                <img :src="images[0].src" alt="">
                            </div>
                            <div class="shop-summary-name">
                                <h2 class="shop-summary-position">
                                    <span>比道客麻辣烫比道客麻辣烫(三道街店)</span>
                                    <i class="icon iconfont icon-xialajiantou"></i>
                                </h2>
                                <div class="shop-summary-status">
                                    <span class="shop-summary-evaluate">评价4.8</span>
                                    <span class="shop-summary-sale">月售2597单</span>
                                    <span class="shop-summary-delivery">蜂鸟专送约33分钟</span>
                                </div>
                            </div>
                            <div class="shop-summary-bargain">
                                <div class="bargain-goods">
                                    <div class="bargain-goods-in">
                                        <span class="bargain-goods-logo">特价</span>
                                        <span class="bargain-goods-txt">特价商品48元起特价商品48元起特价商品48元起特价商品48元起</span>
                                    </div>
                                </div>
                                <div class="bargain-num">
                                    1个优惠
                                    <i class="icon iconfont icon-xialajiantou"></i>
                                </div>
                            </div>
                            <p class="shop-summary-notice">公告：温馨提示： 冰淇淋属于易融化产品，暴风雪类产品会配置干冰，干冰具有较强的制冻功能，您拿到的冰淇淋顶部会凝冻想象，属于正常现象，视情况，可缓化5分钟左右再享用，口感更佳.</p>
                        </div>
                    </div>
                </div>
                <section class="shop-tab-sticky">
                    <div class="shop-tab" ref="chooseType">
                        <div class="shop-tab-item" :class="{activity_show: changeShowType=='food'}" @click="changeShowType='food'">
                            <p>点餐 <span></span></p>
                        </div>
                        <div class="shop-tab-item" :class="{activity_show: changeShowType=='rating'}" @click="changeShowType='rating'">
                            <p>评价 <span></span></p>
                        </div>
                        <div class="shop-tab-item" :class="{activity_show: changeShowType=='business'}" @click="changeShowType='business'">
                            <p>商家 <span></span></p>
                        </div>
                    </div>
                </section>
                <transition name="fade-choose">
                    <section v-show="changeShowType =='food'" class="food_container">
                        <cube-scroll-nav
                                :side="true"
                                :data="menuList"
                                :current="current"
                                @change="changeHandler"
                                @sticky-change="stickyChangeHandler">
                            <cube-scroll-nav-panel
                                    v-for="item in menuList"
                                    :key="item.name"
                                    :label="item.name"
                                    :title="item.name">
                                <ul>
                                    <li v-for="food in item.foods">
                                        <div class="food_details">
                                            <span class="fooddetails-logo">
                                                   <img :src="images[0].src">
                                            </span>
                                            <div class="fooddetails-info">
                                                <p class="fooddetails-name"><span class="fooddetails-nameText">{{food.name}}</span></p>
                                                <p class="fooddetails-desc">蔬菜乌冬面</p>
                                                <p class="fooddetails-sales"><span>月售95份</span><span>好评率100%</span></p>
                                                <div class="fooddetails-footer">
                                                    <span class="fooddetails-price">$30</span>
                                                    <buy-cart :foods='food'></buy-cart>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </cube-scroll-nav-panel>
                        </cube-scroll-nav>


                        <div class="buy_cart_container">
                            <div class="cart_icon_num">
                                <div class="cart_icon_container">
                                    <span class="cart_list_length">10</span>
                                    <span class="cart_icon"><i class="icon iconfont icon-gouwuche"></i></span>
                                </div>
                                <div class="cart_num">
                                    <p>¥ 20.00</p>
                                    <p>配送费¥5</p>
                                </div>
                            </div>
                            <div class="gotopay">
                                <span class="gotopay_button_style">还差3元起送</span>
                                <router-link :to="{path:'/goods'}" class="gotopay_button_style"></router-link>
                            </div>
                        </div>
                    </section>
                </transition>
                <transition name="fade-choose">
                    <section v-show="changeShowType =='rating'" class="rating_container">
                        rating
                    </section>
                </transition>
                <transition name="fade-choose">
                    <section v-show="changeShowType =='business'" class="business_container">
                        business
                    </section>
                </transition>

        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import buyCart from '@/components/common/buyCart'
    import goodsData from '@/data/goods-list.json'
    const goods = goodsData.goods;
    import img1 from '@/assets/img/pic1.jpg'


    export default {
        name: "order",
        data() {
            return {
                menuList: [],
                current:'',
                changeShowType: 'food',//切换显示商品或者评价
                images: [
                    {src: img1}
                ]
            }
        },
        components: {
            buyCart
        },
        beforeCreate: function(){

            console.log('beforeCreate')
        },

        created(){

            console.log('created')
            this.$nextTick(function(){
                this.initData();
            })
        },
        mounted(){
            console.log('mounted')
//           this.initData();
        },
        methods: {
            //初始化时获取基本数据

            initData(){
//                this.menuList=goods;
                //商品列表
                this.$http.get('/api/foodMenu').then((response) => {
                    console.log(response)
//                    this.menuList=response.info.goods
                    this.menuList=goods;
                });

//                this.menuList=menuList1;
//                console.log(menuList1)

            },
            changeHandler(label) {
                console.log('changed to:', label)
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            },
            back() {
                this.$router.back()
            }
        }
    };
</script>

<style lang="less">
    @import "../../assets/style/mixin";
    .cube-page{
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #efeff4;
        font-size:12px;
        .wrapper{
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }

    .scroll-nav-side{
        background-color: #fff;
        .prepend-header{
            width: 90%;
            margin: 20px auto;
            text-align: center;
            font-size: 20px;
            line-height: 1.6;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        }
        .cube-scroll-nav-main{
            background-color: #efeff4;
        }

        .cube-sticky-fixed{
            background-color: #efeff4;

        }
        .cube-scroll-nav-bar{
            width: 120px;
            background-color: transparent;

        }
        .cube-scroll-nav-bar-item{
            padding: 15px;
        }
        .cube-scroll-nav-bar-item_active{
            background-color: #fff;
        }
        .cube-scroll-nav-panels{
            background-color: #fff;
        }

        .cube-scroll-nav-panel{
            img{
                width: 100%;
                height: 100% ;
            }
            ul{
                overflow: hidden;
                font-size: 14px;
                line-height: 1.4;
                color: #666;
            }
            li{
                .food_details{
                    display: flex;
                    padding: 10px 0;
                    .fooddetails-logo{
                      .wh(90px,90px);
                    }
                    .fooddetails-info{
                        padding:0 8px;
                        p{
                            display: flex;
                            justify-content: flex-start;
                        }
                        .fooddetails-nameText{
                            font-weight: 700;
                            color: #1d1b1b;
                        }
                        .fooddetails-desc{
                            margin: 5px 0;
                        }
                        .fooddetails-sales span:first-child{
                            margin-right: 5px;
                        }
                        .fooddetails-footer{
                            display: flex;
                            justify-content: space-between;
                        }
                    }


                }
            }

        }
        .cube-scroll-nav-panel-title{
            padding: 15px;
            font-size: 16px;
            background-color: #fff;
        }

    }

    .shop-nav{
        position: relative;
        &-content{
             padding-top: 100px;
             background: #fff;
            nav{
                .wh(100%,100px);
                position: absolute;
                top:0;
                left:0;
                background: #ffd695;
                text-align: left;
                a{
                    font-size: 30px;
                    color: #fff;
                    margin-left: 5px;
                }
            }
            .shop-summary{
                padding: 35px 0 0;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                .shop-summary-img{
                .wh(80px,80px);
                    background: #00a8e6;
                    position: absolute;
                    top:0;
                    left: 50%;
                    margin-left: -40px;
                    margin-top: -60px;
                .logoBg{
                    position: absolute;
                    left: 0;
                    top:0;
                .linear-gradient(90deg,#fff100,#ffe339);
                .wh(25px,15px);
                    border-top-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                .logoTxt{
                    color: #6f3f15;
                    font-weight: 700;
                    font-size: 12px;
                    transform: scale(.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                }
                img{
                    .wh(100%,100%);
                    .border-radius(4px);
                }
            }
            .shop-summary-name{
                flex: 1;
                width: 300px;
                .shop-summary-position{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 26px;
                    font-weight: bold;
                    span{
                        text-align: left;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    i{
                        width: 35px;
                    }
                }
                .shop-summary-status{
                    white-space:nowrap;
                    color: #666;
                    font-size: 12px;
                    padding-top: 15px;
                    text-align: center;
                    >span:not(:last-child){
                         margin-right: 8px;
                     }
                }
            }
            .shop-summary-bargain{
                width: 100%;
                padding: 15px 30px 0;
                display: flex;
                font-size: 12px;
                color: #333;
                justify-content: space-between;
                align-items: center;
                .bargain-goods{
                    flex: 1;
                    overflow: hidden;
                    .bargain-goods-in{
                        display: flex;
                        justify-content: flex-start;
                        .bargain-goods-logo{
                            margin-right: 15px;
                        }
                        .bargain-goods-txt{
                            flex: 1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
                .bargain-num{
                    width: 80px;
                    text-align: right;
                }
            }
            .shop-summary-notice{
                font-size: 12px;
                padding: 15px 30px 20px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #999;
            }
            }
        }
    }
    .shop-tab-sticky{
        .shop-tab{
            display: flex;
            align-items: center;
            background-color: #fff;
            line-height: 40px;
            border-bottom:1px solid #ebebeb;
            color:#666;
            .shop-tab-item{
                flex: 1;
                p{
                    display: inline-block;
                }
            }
            .activity_show{
                p{
                    position: relative;
                    color: #333;
                    font-weight: 700;
                    span{
                        position: absolute;
                        left:0;
                        bottom:0;
                        right:0;
                        height: 2px;
                        background: rgb(35, 149, 255);
                    }
                }
            }
        }
    }
    .food_container,.rating_container,.business_container{
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .food_container{
        .buy_cart_container{
            display: flex;
            justify-content: space-between;
            height: 55px;
            background-color: #3d3d3f;
            .cart_icon_num{
                flex: 1;
                position: relative;
                z-index: 2;
                .cart_icon_container{
                    padding: 8px;
                    background-color: #3d3d3f;
                    border: 4px solid #444;
                    border-radius: 50%;
                    position: absolute;
                    top: -15px;
                    left: 10px;
                    .cart_list_length{
                        position: absolute;
                        top: -8px;
                        right: -5px;
                        background: #ff461d;
                        border: 1px solid #ff461d;
                        color: #fff;
                        height: 18px;
                        min-width: 18px;
                        line-height: 18px;
                        text-align: center;
                        border-radius: 50%;

                    }
                    .cart_icon{
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        color: #fff;
                        i{
                            font-size: 30px;
                        }

                    }
                }
                 .cart_icon_activity{
                     background-color: #3190e8;
                 }
                 .cart_num{
                     position: absolute;
                     color: #fff;
                     left: 80px;
                     height: 100%;
                     p:first-child{
                         font-size: 18px;
                         font-weight: 700;
                         margin: 5px 0 8px;
                     }
                 }
            }
            .gotopay{
                background-color: #4cd964;
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: 700;
                font-size: 16px;
            }
        }
    }
</style>
