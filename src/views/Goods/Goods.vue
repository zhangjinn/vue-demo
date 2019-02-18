<template>
  <section>
    <head-top head-title="商品" goBack="true">
      <span slot='lt-logo' class="lt-logo"><van-icon name="search" /></span>
      <span slot='rg-logo' class="rg-logo" >登陆/注册</span>
    </head-top>
    <section class="main-container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

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
          </div>

          <div class="swiper-list-container">
            <div class="swiper-container" v-if="foodTypes.length">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(swiperItem, index) in foodTypes" :key="index">
                  <van-row>
                    <van-col span="6" v-for="(item,i) in swiperItem" :key="i" >
                      <router-link to="/foo" class="link_to_food" >
                        <figure class="img_txt_box">
                          <img :src="images[0].src" alt="The Pulpit Rock">
                          <figcaption>{{item.title}} </figcaption>
                        </figure>
                      </router-link>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="shop-list-container">
            <div class="shop-list-header">
              <van-icon name="chat" />附近商家
            </div>
            <shop-list></shop-list>
          </div>

      </van-pull-refresh>
    </section>

    <foot-guide></foot-guide>
  </section>
</template>

<script>
// @ is an alias to /src

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
      count: 0,
      isLoading: false,
      foodTypes: [], // 食品分类列表
      title:'hahhaha',
      images: [
        {src: img1},
        {src: img2},
        {src: img3}
      ],
      navItem:[
        {img:'txt1'},
        {img:'txt2'},
        {img:'txt3'},
        {img:'txt4'},
        {img:'txt5'},
        {img:'txt6'},
        {img:'txt7'},
        {img:'txt8'}
      ]

    }
  },

  components: {
    headTop,
    footGuide,
    shopList
  },
  created(){

  },
  mounted (){
    this.infoRequest();
  },
  methods: {
    async infoRequest(){
      this.foodTypes = await this.$http.get('/api/goods');
      console.log(this.foodTypes);
      this.executeTask();
    },
    executeTask(){
         let resArr = [...this.foodTypes.info];
         var foodArr=[];
         for(let i= 0,j=0;i<=resArr.length;i+=8,j++){
           foodArr[j]=resArr.splice(0,8)
         }
         this.foodTypes = foodArr;
         this.$nextTick(function() {
           this.swiperLoad();
         });

    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
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

  .main-container{
    margin:46px 0 50px 0;

    .swiper-pic-container{
      height: 180px;
      .swiper-container{
        height: 100%;
      }
    }
    .swiper-list-container{
      border-bottom: 1px solid #e4e4e4;
      background-color: #fff;
      .link_to_food{
        display: inline-block;
        margin: 10px 0;
        font-size: 14px;
        color: #333;
        .img_txt_box{
          img{
            width: 50px;
            height: 50px;
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

    .shop-list-container{
      margin-top: 10px;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
      .shop-list-header{
          font-size: 14px;
          padding: 10px 0;
        .fj(flex-start);
          align-items: center;
        .van-icon {
          display: inline-block;
          margin: 0 10px;
          color: #455a64;
        }
      }
    }
  }

</style>
