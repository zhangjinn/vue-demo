<template>
    <div class="cube-page cube-view scroll-nav-side">
        <!--<cube-page type="scroll-tab-view" title="ScrollTab">-->

        <!--<head-top head-title="订单" goBack="true"></head-top>-->
        <div class="wrapper">
            <main class="content">
                <div>
                    <div class="view-wrapper">
                        <cube-scroll-nav
                                :side="true"
                                :data="menuList"
                                @change="changeHandler"
                                @sticky-change="stickyChangeHandler">
                            <ul class="prepend-header" slot="prepend">
                                <li>11</li>
                                <li>22</li>
                                <li>333</li>
                            </ul>
                            <cube-scroll-nav-panel
                                    v-for="item in menuList"
                                    :key="item.name"
                                    :label="item.name"
                                    :title="item.name">
                                <ul>
                                    <li v-for="food in item.foods">
                                        <div>
                                            <img :src="food.image_path">
                                            <p>{{food.name}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </cube-scroll-nav-panel>
                        </cube-scroll-nav>
                    </div>
                </div>
            </main>

        </div>
        <foot-guide></foot-guide>

        <!--</cube-page>-->
    </div>
</template>
<script>
    import headTop from '@/components/header/head.vue'
    import footGuide from '@/components/footer/footGuide.vue'
    export default {
        name: "order",
        data() {
            return {
                menuList: [],
                current: ''
            }
        },
        components: {
            headTop,
            footGuide
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
            }
        }
    };
</script>

<style scoped lang="less">

    /*.cube-page {*/
        /*position: absolute;*/
        /*z-index: 10;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*background: #efeff4;*/
        /*.wrapper{*/
            /*height:100%;*/
            /*overflow-x: hidden;*/
            /*overflow-y: auto;*/
            /*.content{*/
                /*margin: 10px;*/
            /*}*/
        /*}*/
    /*}*/
    /*.scroll-nav-side {*/
        /*background-color: #fff;*/
        /*.view-wrapper{*/
            /*position: fixed;*/
            /*top: 10px;*/
            /*left: 0;*/
            /*bottom: 0;*/
            /*width: 100%;*/
        /*}*/
        /*.prepend-header{*/
            /*width: 90%;*/
            /*margin: 20px auto;*/
            /*text-align: center;*/
            /*font-size: 20px;*/
            /*line-height: 1.6;*/
            /*border-radius: 2px;*/
            /*box-shadow: 0 0 4px rgba(0,0,0,.2);*/
        /*}*/
        /*.cube-scroll-nav-main, .cube-sticky-fixed{*/
            /*background-color: #efeff4;*/
        /*}*/
    /*}*/
    .scroll-nav-side{
        background-color: #fff;
        .view-wrapper{
            position: fixed;
            top: 44px;
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
            background-color: #efeff4
        }

        .cube-sticky-fixed{
            background-color: #efeff4
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
                height: 114px;
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

</style>