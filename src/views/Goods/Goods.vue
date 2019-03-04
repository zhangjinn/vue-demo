<template>
  <div class="v-container">
    <head-top head-title="商品" goBack="true">
      <span slot='lt-logo' class="lt-logo"><van-icon name="search" /></span>
      <span slot='rg-logo' class="rg-logo" >登陆/注册</span>
    </head-top>
    <div class="page-wrapper">

      <div class="home-wrapper">
      <cube-sticky :pos="scrollY" fixedShowAni="11">
      <cube-scroll
              ref="contentScroll"
              :data="restaurants"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
              :scroll-events="scrollEvents"
              @scroll="scrollHandler">
          <div class="main-container">
            <div class="selected-position">
              <div class="selected-position-in">
                <span class="icon iconfont icon-dingweiweizhi"></span>
                <span>龙跃苑四区</span>
                <span class="icon iconfont icon-xialajiantou"></span>
              </div>
            </div>
            <cube-sticky-ele>
              <div class="search-wrapper">
                <div class="search-button">
                  <a href="#" class="search-content">
                    <span class="icon iconfont icon-sousuo"></span>
                    <span class="">搜索饿了么商家、商品名称</span>
                  </a>
                </div>
              </div>
            </cube-sticky-ele>


            <div class="swiper-list-container">
              <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                  <div class="swiper-slide food_types_container" v-for="(swiperItem, index) in foodTypes" :key="index">
                    <router-link to="/foo" class="link_to_food" v-for="(item,index) in swiperItem" :key="index">
                      <figure class="img_txt_box">
                        <img :src="item.image_url" alt="The Pulpit Rock">
                        <figcaption>{{item.title}} </figcaption>
                      </figure>
                    </router-link>
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
              </div>
            </div>
            <div class="notice-container">
              <div class="notice-container-in">
                <div class="vip-notice">
                  <div class="vip-notice-left">
                    <span class="icon iconfont icon-crown"></span>
                    <span>超级会员</span>
                  <span>
                    <i class="icon iconfont icon-yuandian"></i>
                    每月领20元红包
                  </span>
                  </div>
                <span class="vip-notice-right">
                    立即开通
                  <i class="icon iconfont icon-right"></i>
                </span>
                </div>
                <section class="recommend-food">
                  <div class="recommend-food-txt">
                    <h3>品质套餐</h3>
                    <p>搭配齐全吃的好</p>
                    <p><span>立即抢购</span><span class="icon iconfont icon-right"></span></p>
                  </div>
                  <div class="recommend-food-pic">
                    <img :src="images[0].src" alt="">
                  </div>
                </section>
                <div class="swiper-pic-container">
                  <div class="swiper-container">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(image, index) in images" :key="index">
                        <img :src="image.src" alt="">
                      </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                  </div>
                  <div class="business-licence">
                    资质证照
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-list-title">
              <span class="icon iconfont icon-line"></span>
              推荐商家
              <span class="icon iconfont icon-line"></span>
            </div>
            <cube-sticky-ele>
              <div class="filter-shop">
                <div class="filter-shop-container">
                  <a href="#" class="filter-nav">
                    <span>综合排序</span>
                    <i class="icon iconfont icon-xialajiantou"></i>
                  </a>
                  <a href="#" class="filter-nav"><span>距离最近</span></a>
                  <a href="#" class="filter-nav"><span>品质联盟</span></a>
                  <a href="#" class="filter-nav-more"><span>筛选</span><i class="icon iconfont icon-shaixuan1"></i></a>
                </div>
              </div>
            </cube-sticky-ele>

            <div class="shop-list-wrapper">
              <shop-list :restaurants="restaurants"></shop-list>
            </div>
          </div>

          <template slot="pulldown" slot-scope="props">
            <div v-if="props.pullDownRefresh"
                 class="cube-pulldown-wrapper"
                 :style="props.pullDownStyle">
              <div v-if="props.beforePullDown"
                   class="before-trigger"
                   :style="{paddingTop: props.bubbleY + 'px'}">
                <span :class="{rotate: props.bubbleY > 0}">↓</span>
              </div>
              <div class="after-trigger" v-else>
                <div v-show="props.isPullingDown" class="loading">
                  <cube-loading :size="28"></cube-loading>
                </div>
                <transition name="success">
                  <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">Refresh success</span></div>
                </transition>
              </div>
            </div>
          </template>
      </cube-scroll>
      </cube-sticky>
    </div>

    </div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
// @ is an alias to /src
import loading from '@/components/common/loading.vue'
import headTop from '@/components/header/head.vue'
import footGuide from '@/components/footer/footGuide.vue'
import shopList from '@/components/common/shopList.vue'
import img1 from '@/assets/img/pic1.jpg'
import img2 from '@/assets/img/pic2.jpg'
import img3 from '@/assets/img/pic3.jpg'
import Swiper from 'swiper';


export default {
  name: "goods",
  data(){
    return {
      count:0,
      showLoading:true, //显示加载动画
      foodTypes: [], // 食品分类列表
      restaurants:[], // 店铺列表数据
      options: {
        pullDownRefresh: {
          threshold: 46,
          stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold: 60,
          txt: {
            more:'Load more',
            noMore: 'No more data'
          }
        }
      },
      secondStop: 26,
      scrollEvents: ['scroll'],
      scrollY: 0,
      images: [
        {src: img1},
        {src: img2},
        {src: img3}
      ]

    }
  },

  components: {
    headTop,
    footGuide,
    shopList,
    loading
  },

  created(){

  },
  mounted (){
    this.infoRequest();
  },
  computed:{

  },
  methods: {
    async infoRequest(){

      this.foodTypes=await this.$http.get('/foo/mock/goodsList');
      let restaurantsInfo=await this.$http.get('/foo/vDemo/restaurants');
      //考虑到本地模拟数据是引用类型，所以返回一个新的数组
      this.restaurants = [...restaurantsInfo.info];

      this.hideLoading();
      this.executeTask();
    },
    executeTask(){
         let resArr = [...this.foodTypes.info];
         var foodArr=[];
        for(var i=0;i<resArr.length;i+=10){
          foodArr.push(resArr.slice(i,i+10));
        }
         this.foodTypes = foodArr;
        console.log(this.foodTypes);
         this.$nextTick(function() {
           this.swiperLoad();
         });

    },
    onPullingDown() {
        this.refreshData();
    },
    onPullingUp() {
        this.loaderMoreData();
    },
    async refreshData(){
        let restaurantsInfo=await this.$http.get('/foo/vDemo/restaurants');
        this.restaurants = [...restaurantsInfo.info];
        this.$refs.contentScroll.scrollTo(0, this.secondStop, 300);
        this.count=0;
    },
    //到达底部加载更多数据
    async loaderMoreData(){
        this.count++;
      if( this.count<5){
        let restaurantsInfo=await this.$http.get('/foo/vDemo/restaurants');
        this.restaurants = [...this.restaurants, ...restaurantsInfo.info];
      }else{
        const contentScroll = this.$refs.contentScroll;
        contentScroll.forceUpdate();
      }

    },
    onDataLoad() {
      const contentScroll = this.$refs.contentScroll;
      contentScroll.scroll.beforePullDown && contentScroll.refresh()
    },
    scrollHandler({ y }){
      this.scrollY = -y;
    },
    hideLoading(){
      this.showLoading = false;
    },
    swiperLoad(){
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
         delay: 3000,
         stopOnLastSlide: false,
         disableOnInteraction: false
         },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      })
    }
  }
};
</script>
<style lang="less" scoped>
  @import "../../assets/style/mixin";

  .page-wrapper{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
    transform: rotate(0deg);
    overflow: hidden;
    .home-wrapper{
      height: 100%;
      padding:46px 0 50px 0;
      .main-container{
        .selected-position{
          padding: 10px 15px 0;
          .linear-gradient(90deg,#0af,#0085ff);
          color: #fff;
          .selected-position-in{
            display: flex;
            align-items: center;
            height: 35px;
          }
        }
        .swiper-list-container{
          background:#fff;
          padding: 10px 0 15px;
          .food_types_container{
            display: flex;
            flex-wrap: wrap;
            .link_to_food{
              width: 20%;
              display: flex;
              justify-content: center;
              padding: 6px 0;
              figure{
                img{
                  width: 32px;
                  height: 32px;
                  margin-bottom:6px ;
                }
                figcaption{
                  font-size: 11px;
                  color: #666;
                }
              }
            }
          }
        }

      .notice-container{
        background:#fff;
        .notice-container-in{
          padding: 0 10px;
          .vip-notice{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .linear-gradient(90deg,#ffefc4,#f3dda0);
            font-size: 11px;
            color: #644f1b;
            border-radius: 4px;
            margin-bottom: 6px;
            padding: 0 5px 0 10px;
            .vip-notice-left,.vip-notice-right{
              display: flex;
              align-items: center;
            }
          }

          .recommend-food{
            display: flex;
            justify-content: space-between;
            align-items:center;
            padding: 10px 15px;
            background: linear-gradient(0deg,#f4f4f4 5%,#fafafa 95%);
            .recommend-food-txt{
              text-align: left;
              h3{
                font-size: 16px;
                color: #333;
                font-weight: bold;
                margin-bottom: 10px;
              }
              p:nth-of-type(1){
                 font-size: 14px;
                 color: #777;
                 margin-bottom: 10px;
               }
              p:nth-of-type(2){
                font-size: 14px;
                color: #af8260;
                font-weight: 700;
                display: flex;
                align-items: center;
              }
            }
            .recommend-food-pic{
              .wh(150px,100px);
              img{
                .wh(100%,100%);
              }
            }
          }

          .swiper-pic-container{
            height: 100px;
            margin-top:6px;
            position:relative;
            .swiper-container{
              height: 100%;
            }
            .business-licence{
              position: absolute;
              right: 0;
              bottom: 0;
              padding: 5px;
              .border-radius(15px);
              background: #0a0a0a70;
              font-size: 11px;
              z-index: 1;
              color: #fff;
              transform: scale(.8);
            }
          }
        }
      }

        .swiper-container{
          width:100%;
          img{
            width:100%;
            height: 100%;
          }
        }
        .shop-list-title{
          background: #fff;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .shop-list-container{
          margin-top: 10px;
          border-top: 1px solid #e4e4e4;
          background-color: #fff;
          display: flex;
          flex-direction:column;
        }
      }

      .search-wrapper{
        .linear-gradient(90deg,#0af,#0085ff);
          /*position: sticky;*/
          /*top: 46px;*/
          /*z-index: 999;*/
        .search-button{
          display: flex;
          padding: 10px;
          .search-content{
            flex: 1;
            display: flex;
            height: 35px;
            align-items: center;
            justify-content: center;
            background: #fff;
            font-size: 12px;
          .border-radius(2px)
          }
        }
      }
    .filter-shop{
      /*position: sticky;*/
      /*top: 101px;*/
      /*z-index: 1;*/
      .filter-shop-container{
        background: #fff;
        display: flex;
        font-size: 12px;
        height: 40px;
        align-items: center;
        border-bottom: 1px solid #ddd;
        .filter-nav{
          flex: 1;
        &:nth-of-type(1){
           display: flex;
           justify-content: center;
           align-items: center;
         }
        }
        .filter-nav-more{
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
      .cube-pulldown-wrapper{
        text-align: center;
        display:flex;
        align-items:center;
        justify-content:center;
        .before-trigger{
          height: auto;
          font-size: 30px;
          align-self: flex-end;
           span{
             display: inline-block;
             line-height: 1;
             transition: all 0.3s;
             color: #666;
             padding: 8px 0;
             &.rotate{
                transform: rotate(180deg);
              }
           }
        }
        .after-trigger{
          flex: 1;
          margin: 0;
          .text-wrapper{
            margin: 0 auto;
            margin-top: 18px;
            padding: 5px 0;
            color: #498ec2;
            background-color: #d6eaf8;
          }
          .loading{
            display:flex;
            justify-content:center;
          }
        }
        .success-enter-active, .success-leave-active{
          transition: width .5s
        }
        .success-enter, .success-leave-to{
          width: 70%
        }
        .success-enter-to, .success-leave{
          width: 100%
        }
      }
    }

  }
</style>
