

<template>
    <div class="profileContainer">
        <head-top head-title="我的" goBack="true">
            <span slot='lt-logo' class="lt-logo">
                <van-icon name="arrow-left" />
            </span>
        </head-top>
        <div class="page-wrapper">
            <div class="home-wrapper">
                <van-row>
                    <van-col span="24">
                        <router-link class="profile-logo" :to="'/login'">
                            <span class="privateImg">
                                <img src="../../assets/logo.png" alt="">
                            </span>
                            <div class="privateLogin">
                                <p>登录/注册</p>
                                <p>
                                    <span>
                                       <van-icon name="search"/>
                                    </span>
                                    <span>
                                        暂无绑定手机号
                                    </span>
                                </p>
                            </div>
                            <span class="profileArrow">
                                <van-icon name="arrow"/>
                            </span>
                        </router-link>
                    </van-col>
                </van-row>
                <van-row class="info-data">
                    <van-col span="8">
                        <a href="#" class="info-data-link">
                            <span><b class="remainingSum">8</b>元</span>
                            <span>我的余额</span>
                        </a>
                    </van-col>
                    <van-col span="8">
                        <a href="#" class="info-data-link">
                            <span><b class="preferential">12</b>个</span>
                            <span>我的优惠</span>
                        </a>
                    </van-col>
                    <van-col span="8">
                        <a href="#" class="info-data-link">
                            <span><b class="accumulatePoint">8</b>分</span>
                            <span>我的积分</span>
                        </a>
                    </van-col>
                </van-row>
                <section class="profile-1reTe">
                    <van-cell-group>
                        <!--我的订单-->
                        <router-link :to="'/login'">
                            <van-cell is-link center>
                                <template slot="icon">
                                    <i class="icon iconfont icon-huangguan"></i>
                                </template>
                                <template slot="title">
                                    <span class="custom-text">我的订单</span>
                                </template>
                            </van-cell>
                        </router-link>

                        <a href="https://home.m.duiba.com.cn/#/chome/index">
                            <van-cell is-link center>
                                <template slot="icon">
                                    <i class="icon iconfont icon-huangguan"></i>
                                </template>
                                <template slot="title">
                                    <span class="custom-text">积分商城</span>
                                </template>
                            </van-cell>
                        </a>
                    </van-cell-group>

                    <van-cell-group>
                        <router-link :to="'/serve'">
                            <van-cell is-link center>
                                <template slot="icon">
                                    <i class="icon iconfont icon-huangguan"></i>
                                </template>
                                <template slot="title">
                                    <span class="custom-text">服务中心</span>
                                </template>
                            </van-cell>
                        </router-link>

                        <van-cell is-link center>
                            <template slot="icon">
                                <i class="icon iconfont icon-huangguan"></i>
                            </template>
                            <template slot="title">
                                <span class="custom-text">下载饿了么APP</span>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </section>
            </div>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script type="text/ecmascript-6">
    import headTop from '../../components/header/head'
    import footGuide from '@/components/footer/footGuide.vue'
    export default{
        data(){
            return{

            }
        },
        components:{
            headTop,
            footGuide
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin";
    img{
        .wh( 100%,100%);
    }
    .profileContainer{
        .profile-logo{
            display: flex;
            align-items: center;
            padding: 15px;
            background: #3190e8;
            color: #fff;
            .privateImg{
                .wh(50px,50px);
                border-radius: 50%;
                display: inline-block;
                background-color: #fff;
            }
            .privateLogin{
                flex: 1;
                text-align: left;
                margin-left: 15px;
                p:first-child{
                   margin-bottom: 5px;
                }
            }
            .profileArrow{
               .wh(20px,20px);
            }
        }
        .info-data{
            background:#fff;
            .van-col{
                border-right:1px solid #ccc;
                padding:15px;
                &:nth-of-type(3){
                     border: 0;
                 }
            }
        }
        .info-data-link{
            display: inline-block;
            span{
                display: block;
               &:nth-of-type(2){
                    font-size: 0.5rem;
                 }
            };
            b{
                font-size: 30px;
                font-weight: 700;
            }
            .remainingSum{
                 color: #f90;
             };
            .preferential{
                 color:#ff5f3e;
             };
            .accumulatePoint{
                 color: #6ac20b;
             };

        }
       .profile-1reTe{
           text-align: left;
           i{
               margin-right: 5px;
           }
           .van-cell-group{
               margin-bottom: 15px;
           }
       }
    }
</style>
