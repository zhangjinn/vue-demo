<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
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
                                    <header class="menu_detail_header">
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{item.name}}</strong>
                                            <span class="menu_item_description">{{item.description}}</span>
                                        </section>
                                    </header>
                                    <section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                                        <div class="food_details">
                                            <span class="fooddetails-logo">
                                                   <img :src="images[0].src">
                                            </span>
                                            <div class="fooddetails-info">
                                                <p class="fooddetails-name"><span class="fooddetails-nameText">{{foods.name}}</span></p>
                                                <p class="fooddetails-desc">蔬菜乌冬面</p>
                                                <p class="fooddetails-sales"><span>月售95份</span><span>好评率100%</span></p>
                                                <div class="fooddetails-footer">
                                                    <span class="fooddetails-price">$30</span>
                                                    <buy-cart :shopId='shopId' :foods='foods' @showMoveDot="showMoveDotFun"></buy-cart>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>

                    <div class="buy_cart_container">
                        <div class="cart_icon_num">
                            <div class="cart_icon_container" :class="{cart_icon_activity:totalPrice>0,move_in_cart:receiveInCart}" ref="cartContainer">
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
                                        </section>
                                        <span>4.7</span>
                                    </p>
                                    <p>
                                        <span>服务态度</span>
                                        <section class="rating_container_in">
                                            <div class="star_container">你好</div>
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
        <!--初始渲染的过渡 -->
        <transition
        appear
        @after-appear="afterEnter"
        @before-appear="beforeEnter"
        v-for="(item,index) in showMoveDot"
        >
            <span class="move_dot" v-if="item"><i class="icon iconfont icon-plus-circle move_liner"></i></span>

        </transition>
        <!--<loading v-show="showLoading || loadRatings"></loading>-->
    </div>

</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import buyCart from '@/components/common/buyCart';
    import loading from '@/components/common/loading.vue';
    import BScroll from 'better-scroll';
    import img1 from '@/assets/img/pic1.jpg';
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
                preventRepeatRequest: false, // 防止多次触发数据请求
                receiveInCart:false, //购物车组件下落的圆点是否到达目标位置
                showMoveDot:[], //控制下落的小圆点的显示隐藏
                elLeft:0, //当前点击加按钮在网页中的绝对left值
                elBottom:0,//当前点击加按钮在网页中的绝对bottom值
                windowHeight:null, //屏幕的高度
                totalPrice: 0, //总共价格
                shopId:1,
                images: [
                    {src: img1}
                ]

            }
        },
        created(){

        },
        mounted(){
            this.initData();
            this.windowHeight=window.innerHeight;

        },
        components:{
            loading,
            buyCart
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
        computed:{
                ...mapState(['cartList'])
        },
        methods: {
            ...mapMutations(['ADD_CART']),
            //初始化时获取基本数据
            async initData(){
        //商品列表
        this.menuList=await this.$http.get('/api/foodMenu');
        //评论列表
        this.ratingList=await this.$http.get('/foo/rateList');

        this.menuList = [...this.menuList.info.goods];
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
        ratingDate= [...ratingDate.info] ;
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
    },
    /*
     * 显示下落的小球
     * */
    showMoveDotFun(showMoveDot,elLeft,elBottom){
        this.showMoveDot= [...this.showMoveDot, ...showMoveDot];
        this.elLeft=elLeft;
        this.elBottom=elBottom;
    },
    beforeEnter(el){
        el.style.transform=`translate3d(0,${this.elBottom-this.windowHeight+30}px,0)`;
        el.children[0].style.transform = `translate3d(${this.elLeft-30}px,0,0)`;
        el.children[0].style.opacity = 0;
    },
    afterEnter(el){
        el.style.transform = `translate3d(0,0,0)`;
        el.children[0].style.transform = `translate3d(0,0,0)`;
        el.children[0].style.opacity = 1;
        el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
        el.children[0].style.transition = 'transform .55s linear';
        this.showMoveDot = this.showMoveDot.map(item => false);

        /*CSS完成过渡后触发*/
        el.children[0].addEventListener('transitionend', () => {
                this.listenInCart();
        })
        el.children[0].addEventListener('webkitAnimationEnd', () => {
                this.listenInCart();
        })
    },
    /*
    * 监听圆点是否到达购物车
    * */
    listenInCart(){
        if(!this.receiveInCart){
            this.receiveInCart=true;
            this.$refs.cartContainer.addEventListener('animationend', () => {
                this.receiveInCart = false;
            })
            this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                this.receiveInCart = false;
            })

        }
    }


    }
    }
</script>
<style scoped lang="less">
    @import "../../assets/style/mixin";

    @keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-moz-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-webkit-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-o-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }

    .shop_container{
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

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
        flex-direction: column;
    }
    .food_container{
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

            >section{
                padding:5px 0;
                 background: #fff;
            }
            img{
                width: 100%;
                height: 100%;
            }
            .menu_detail_header{
                width: 100%;
                padding: 10px;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .menu_detail_list{

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
                    margin-top: 5px;
                }
                }


                }
            }
        }
    }
    }

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
    .move_in_cart{
        animation: mymove .5s ease-in-out;
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
/*

*/
    .move_dot{
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 20px;
        height: 20px;
        display:inline-block;
      i{
          display:inline-block;
          background:#3190e8;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          padding: 1px 0 0;
          color: #fff;
          font-size: 1.25rem;
      }

    }
</style>