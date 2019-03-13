

<template>
    <div class="cube-page scroll-nav-side">
        <!--<header class="header">-->
            <!--<h1>hahahha</h1>-->
            <!--<i @click="back" class="cubeic-back"></i>-->
        <!--</header>-->
        <div class="wrapper">
            <main class="content">
                <slot name="content">
                    <div class="view-wrapper">
                    <cube-scroll-nav
                            :side="true"
                            :data="data"
                            :current="current"
                            @change="changeHandler"
                            @sticky-change="stickyChangeHandler">
                        <div class="prepend-container" slot="prepend">
                            <div class="shop-nav" >
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
                        </div>


                        <transition name="fade-choose">
                            <section v-show="changeShowType =='food'" class="food_container">
                                <cube-scroll-nav-panel
                                        v-for="item in data"
                                        :key="item.name"
                                        :label="item.name"
                                        :title="item.name">
                                    <ul>
                                        <li v-for="food in item.foods">
                                            <div>
                                                <img :src="food.icon">
                                                <p>{{food.name}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </cube-scroll-nav-panel>
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


                    </cube-scroll-nav>
                    </div>
                </slot>
            </main>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
//    import CubePage from '../../components/cube-page.vue'
    import goodsData from '@/data/goods-list.json'
    const goods = goodsData.goods;
    import img1 from '@/assets/img/pic1.jpg'

    export default {
        name: "order",
        data() {
            return {
                menuList: [],
                data:goods,
                current: goods[3].name,
                changeShowType: 'food',//切换显示商品或者评价
                images: [
                    {src: img1}
                ]
            }
        },
        components: {
//            headTop,
//            footGuide
//            CubePage
        },
        created(){
            this.$nextTick(function() {
                this.initData();
            });

        },
        methods: {
            async initData(){
                //商品列表
                this.menuList=await this.$http.get('/foo/vDemo/foodList');
                this.menuList = [...this.menuList.info];
//                this.current=this.menuList[3].name;
                console.log(this.menuList)

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
        .header{
            position: relative;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background-color: #edf0f4;
            box-shadow: 0 1px 6px #ccc;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            z-index: 5;
            h1{
                font-size: 16px;
                font-weight: 700;
            }
            .cubeic-back{
                position: absolute;
                top: 0;
                left: 0;
                padding: 0 15px;
                color: #fc9153;
            }

        }
        .wrapper{
            height: calc(100% - 44px);
            overflow-x: hidden;
            overflow-y: auto;
        }
    }

    .scroll-nav-side{
        background-color: #fff;
        .view-wrapper{
            position: fixed;
            /*top: 44px;*/
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
        }
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
                width: 114px;
                height: 114px ;
            }
            ul{
                overflow: hidden;
                font-size: 14px;
                line-height: 1.4;
                color: #666;
            }
            li{
                float: left;
                width: 50%;
                div{
                    width: 114px;
                    margin: auto;
                    p{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
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
</style>
