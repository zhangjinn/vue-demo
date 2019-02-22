<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="goback">
                <
            </nav>
            <header class="shop_detail_header">
                <div class="shop_detail_header_txt">
                    shop header
                </div>
            </header>
            <section class="change_show_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'">商品</span>
                </div>
                <div>
                    <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">评价</span>
                </div>
            </section>
            <!--<cube-button @click="showDialog">show dialog</cube-button>-->
            <transition name="fade-choose">
                <section v-show="changeShowType =='food'" class="food_container">
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                    <span>{{item.name}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index">
                                    <header>
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{item.name}}</strong>
                                            <span class="menu_item_description">{{item.description}}</span>
                                        </section>
                                    </header>
                                    <section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                                        <section>
                                            <h3 class="food_description_head">
                                                <strong class="description_foodname">{{foods.name}}</strong>

                                            </h3>
                                        </section>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-show="changeShowType =='rating'"  class="rating_container" >
                    <section id="ratingContainer" ref="ratingList">
                        <section>
                            <header class="rating_header">
                                <section class="rating_header_left">
                                    <p>4.7</p>
                                    <p>综合评价</p>
                                    <p>高于周边商家76.9%</p>
                                </section>
                                <section class="rating_header_right">
                                    <p>
                                        <span>服务态度</span>
                                        <section class="rating_container_in">
                                            <div class="star_container">你好</div>
                                            <!--<div class="star_overflow">你好</div>-->
                                        </section>
                                        <span>4.7</span>
                                    </p>
                                    <p>
                                        <span>服务态度</span>
                                        <section class="rating_container_in">
                                            <div class="star_container">你好</div>
                                            <!--<div class="star_overflow">你好</div>-->
                                        </section>
                                        <span>4.7</span>
                                    </p>
                                    <p>
                                        <span>送达时间</span>
                                        <span>分钟</span>
                                    </p>
                                </section>
                            </header>
                            <ul class="rating_list_ul">
                                <li v-for="(item,index) in ratingList" :key="index" class="rating_list_li">
                                    <img :src="item.touxiang" alt="" class="user_avatar">
                                    <section class="rating_list_details">
                                        <header>
                                            <section class="username_star">
                                                <p class="username">{{item.username}}</p>
                                                <div class="star_desc">
                                                    <div>fivestars</div>
                                                    <span>{{item.time_spent_desc}}</span>
                                                </div>
                                            </section>
                                            <time class="rated_at">
                                               {{item.rated_at}}
                                            </time>
                                        </header>
                                        <ul class="food_img_ul">
                                            <li v-for="(item,index) in item.item_ratings" :key="index">
                                                <img :src="item.image_hash" alt="">
                                            </li>

                                        </ul>
                                        <ul class="food_name_ul">
                                            <li class="ellipsis" v-for="(item,index) in item.item_ratings" :key="index">
                                                  {{item.food_name}}
                                            </li>

                                        </ul>
                                    </section>
                                </li>
                            </ul>
                        </section>

                    </section>
                </section>
            </transition>

        </section>

        <loading v-show="showLoading || loadRatings"></loading>
    </div>

</template>
<script>
    import loading from '@/components/common/loading.vue'
    import BScroll from 'better-scroll'

    export default{
        data(){
            return{
                activeKey: 0,
                showLoading:true, //显示加载动画
                changeShowType: 'food',//切换显示商品或者评价
                menuList: [], //食品列表
                menuIndex: 0, //已选菜单索引值，默认为0
                menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
                shopListTop: [], //商品列表的高度集合
                foodScroll: null,  //食品列表scroll
                ratingList:null, //评价列表
                ratingOffset: 0, //评价获取数据offset值
                loadRatings: false, //加载更多评论是显示加载组件
                preventRepeatRequest: false// 防止多次触发数据请求
            }
        },
        created(){

        },
        mounted(){
            this.initData();
        },
        components:{
          loading
        },
        watch:{
            //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
            showLoading:function(value){
                if(!value){
                    this.$nextTick(()=>{

                        this.executeWork();
                    })
                }
            },
            //切换到评论状态
            changeShowType:function(value){
                if(value==="rating"){
                    this.$nextTick(()=>{
                        this.ratingScroll=new BScroll(this.$refs.ratingList,{
                            probeType: 3,
                            deceleration: 0.003,
                            bounce: false,
                            swipeTime: 2000,
                            click: true
                        });
                        this.ratingScroll.on('scroll',(pos)=>{
                            if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))){
                                this.loaderMoreRating();
                                this.ratingScroll.refresh();
                            }
                        })

                    })
                }
            }

        },
        methods: {

            //初始化时获取基本数据
            async initData(){
                //商品列表
                this.menuList=await this.$http.get('/api/foodMenu');
                //评论列表
                this.ratingList=await this.$http.get('/foo/rateList');

                this.menuList = [...this.menuList.info];
                this.ratingList = [...this.ratingList.info];
                console.log(this.ratingList)
                this.hideLoading();
            },
            //加载更多评论
            async loaderMoreRating(){
                if (this.preventRepeatRequest) {
                    return
                }
                this.loadRatings = true;
                this.preventRepeatRequest = true;
                this.ratingOffset += 10;
                let ratingDate=await this.$http.get('/foo/rateList');
                    ratingDate= [...ratingDate.info];
                this.ratingList = [...this.ratingList,...ratingDate]; //展开运算符结合数组
                this.loadRatings = false;
                this.preventRepeatRequest = false;

            },
            showDialog() {
                    this.$createDialog({
                        type: 'alert',
                        title: 'Alert',
                        content: 'dialog content'
                    }).show()
            },
            onClick(index, title) {
                this.$toast(title);
            },
            onChange(key) {
                this.activeKey = key;
            },
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                this.foodScroll.scrollTo(0,-this.shopListTop[index],400); //选择左侧监听右侧
                this.foodScroll.on('scrollEnd',()=>{
                    this.menuIndexChange = true;
                })


            },
            //获取数据后执行
            executeWork(){
                this.$nextTick(() => {
                    this.getFoodListHeight();

                    console.log(this.menuList)
                })
            },

            //获取食品列表的高度，存入shopListTop
            getFoodListHeight(){
                const listContainer=this.$refs.menuFoodList;
                if(listContainer){
                    const listArr = Array.from(listContainer.children[0].children);//ES6 Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
                    listArr.forEach((item, index)=>{
                        this.shopListTop[index]=item.offsetTop;
                    })

                    this.listenScroll(listContainer)
                }


            },

            //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
            listenScroll(element){
                //左侧滚动初始化
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.wrapperMenu, {
                        click: true
                    });
                }else{
                    this.scroll.refresh()
                }
                //右侧滚动初始化
                this.foodScroll=new BScroll(element,{
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true
                });
                const wrapMenuHeight=this.$refs.wrapperMenu.clientHeight;
                this.foodScroll.on('scroll',(pos)=>{//滚动右侧监听左侧
                    if(!this.$refs.wrapperMenu){
                            return
                    }

                    this.shopListTop.forEach((item,index)=>{
                        if(this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item){
                            this.menuIndex = index;
                            const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                            const el = menuList[0];
                            this.scroll.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));

                        }
                    })
                })
            }

        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/style/mixin";
    .shop_container{
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
    }
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        z-index: 11;
        padding-top: .2rem;
        padding-left: .2rem;
        text-align: left;
        color: white;
        font-size: 20px;
        background: #03a9f44f;

    }

    .shop_detail_header_txt{
       height: 100px;
        background: #00a8e6;
    }
    .change_show_type{
        display: flex;
        background-color: #fff;
        padding: 15px 30px;
        border-bottom: 1px solid #ebebeb;
            div{
                flex: 1;
                text-align: center;
            span{
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show{
                color: #3190e8;
                border-color: #3190e8;
            }
        }
    }
    .food_container,.rating_container{
        display: flex;
        flex: 1;
        padding-bottom:50px
    }
    .menu_container{
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
        .menu_left{
            width:100px;
            .menu_left_li{
                padding: 15px 10px;
                border-bottom: 1px solid #ededed;
                box-sizing: border-box;
                border-left: 4px solid #f8f8f8;
                position: relative;
            }
            .activity_menu{
                border-left: 4px solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1){
                    font-weight: bold;
                }
            }
        }
        .menu_right{
            flex: 4;
            overflow-y: auto;
            li{
               margin-bottom: 50px;
                section{
                    padding:5px 0;
                }
            }
        }
    }
    .rating_container{
        overflow-y: hidden;
        #ratingContainer{
            flex: 1;
            .rating_header{
                display: flex;
                background-color: #fff;
                padding: 16px 10px;
                margin-bottom: 10px;
                .rating_header_left{
                    flex: 3;
                    text-align: center;
                    p:first-of-type{
                        font-size: 24px;
                        color: #f60;
                    }
                    p:nth-of-type(2){
                        font-size: 16px;
                        color: #666;
                        margin-bottom: 2px;
                    }
                    p:nth-of-type(3){
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 2px;
                    }
                }
                .rating_header_right{
                    flex: 4;
                    p{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        font-size: 16px;
                        line-height: 16px;

                    }


                }
            }


            .rating_list_ul{
                background-color: #fff;
                padding: 0 10px;
                .rating_list_li{
                    border-top: 1px solid #f1f1f1;
                    display: flex;
                    padding: 12px;
                    .user_avatar{
                        .wh(30px, 30px);
                        border-radius: 50%;
                        margin-right: 16px;
                    }
                    .rating_list_details{
                        flex: 1;
                        header{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 6px;
                            font-size: 11px;
                            .username_star{

                                color: #666;
                                .username{
                                    display: flex;
                                    margin-bottom: 6px;
                                }
                                .star_desc{
                                    display: flex;
                                    align-items: center;
                                }
                            }
                            .rated_at{
                                color: #999;
                            }
                        }
                        .food_img_ul{
                             display: flex;
                             flex-wrap: wrap;
                             margin-bottom: 8px;
                            li{
                                .wh(60px,60px);
                                margin:0 8px 6px 0;
                                img{
                                    .wh(100%,100%);
                                }
                            }
                         }
                        .food_name_ul{
                             display: flex;
                             flex-wrap: wrap;
                            li{
                                font-size: 11px;
                                color: #999;
                                width: 44px;
                                padding: 4px;
                                border:1px solid #ebebeb;
                                border-radius: 3px;
                                margin-right: 6px;
                                margin-bottom: 8px;
                            }
                         }
                    }
                }
            }
        }
    }

</style>