<template>
   <section class="shop_container">
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
       <transition name="fade-choose">
            <section v-show="changeShowType =='food'" class="food_container">
                <section class="menu_container">
                    <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                        <ul>
                            <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                <!--<img :src="getImgPath(item.icon_url)" v-if="item.icon_url">-->
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </section>
                    <section class="menu_right" ref="menuFoodList">

                    </section>
                </section>
            </section>
       </transition>
       <transition name="fade-choose">
           <section v-show="changeShowType =='rating'"  class="rating_container" id="ratingContainer">
                vvv
           </section>
       </transition>
       <!--<section class="food_container">-->
           <!--<van-tabs @click="onClick">-->
               <!--<van-tab title="标签 1">-->
                   <!--<section class="menu_container">-->
                       <!--<section class="menu_left">-->
                           <!--<van-badge-group :active-key="activeKey" @change="onChange" >-->
                               <!--<van-badge :title="item.name" v-for="(item,index) in menuList" :key="index" class="menu_left_btn"/>-->

                           <!--</van-badge-group>-->
                       <!--</section>-->
                       <!--<section class="menu_right">-->

                       <!--</section>-->
                   <!--</section>-->
               <!--</van-tab>-->
               <!--<van-tab title="标签 2">内容 2</van-tab>-->
           <!--</van-tabs>-->
       <!--</section>-->
   </section>
</template>
<script>
    export default{
        data(){
            return{
                activeKey: 0,
                changeShowType: 'food',//切换显示商品或者评价
                menuList: [], //食品列表
                menuIndex: 0 //已选菜单索引值，默认为0
            }
        },
        mounted(){
            console.log(this.$route)
            this.getFoodMenuData();
        },
        methods: {
            onClick(index, title) {
                this.$toast(title);
            },
            onChange(key) {
                this.activeKey = key;
            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index){
                console.log(index)
                this.menuIndex = index;

            },
            getFoodMenuData(){
                this.$ajax({
                            method:'get',
                            url:'/api/foodMenu'
                        })
                        .then(function(response){
                            console.log(response.data);
                            let resArr = [...response.data.info];
                            this.menuList = resArr;

                            console.log( this.menuList);
                        }.bind(this)).catch(function(error){
                    console.log(error)
                })
            }


        }
    }
</script>
<style scoped lang="less">

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
            /*@include sc(.65rem, #666);*/
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show{
                color: #3190e8;
                border-color: #3190e8;
            }
        }
    }
    .food_container{
        display: flex;
        /*-ms-flex: 1;*/
        /*flex: 1;*/
    }
    .menu_container{

        display: flex;
        overflow-y: hidden;
        position: relative;
        .menu_left{
            width:100px;
        }
        .menu_right{
            flex: 4;
            background: #7ce4ff;
            overflow-y: auto;
        }
    }
</style>