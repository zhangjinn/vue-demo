<template>
    <div>
        <section class="cart_module">
            <section class="cart_button" v-if="!foods.specifications.length">
                <transition name="showReduce">
                    <span v-if="foodNum" @click="removeOutCart(foods.category_id, foods.item_id, foods.food_id, foods.name, foods.price)"><i class="icon iconfont icon-jianhao"></i></span>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="add_icon" @click="addToCart(foods.category_id, foods.item_id, foods.food_id, foods.name, foods.price, $event)"><i class="icon iconfont icon-plus-circle"></i></span>
            </section>
            <section class="choose_specification" v-else>
                <section class="choose_icon_container">
                    <transition name="showReduce">
                        <span class="specs_reduce_icon" v-if="foodNum"><i class="icon iconfont icon-jianhao"></i></span>
                    </transition>
                    <transition name="fade">
                        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                    </transition>
                    <span class="show_chooselist">选规格</span>
                </section>
            </section>
        </section>

    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    export default{
        props:['foods','shopId'],
        data(){
            return{
                showMoveDot:[] //控制下落的小圆点显示隐藏
            }
        },
        mounted(){
//            console.log(this.foods)
        },
        computed:{
            ...mapState([
                    'cartList'
            ]),
            /*
            * 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
            * */
            shopCart:function(){
                return Object.assign({},this.cartList[this.shopId])
            },
            foodNum:function(){
                let category_id = this.foods.category_id;
                let item_id = this.foods.item_id;
                if(this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]){
                    let num = 0;
                    Object.values(this.shopCart[category_id][item_id]).forEach((item,index) => {
                        num += item.num
                    })
                    return num;
                }else{
                    return 0;
                }

            }
        },
        methods:{
            ...mapMutations([
                'ADD_CART','REDUCE_CART'
            ]),
            //移除购物车
            removeOutCart(){
                console.log(111)
            },
            //加入购物车，计算按钮位置
            addToCart(category_id, item_id, food_id, name, price, event){

                this.ADD_CART({shopid:this.shopId, category_id, item_id, food_id, name, price});
                this.showMoveDot=[];
                let elLeft=event.target.getBoundingClientRect().left;
                let elBottom=event.target.getBoundingClientRect().bottom;
                this.showMoveDot.push(true);
                this.$emit('showMoveDot',this.showMoveDot,elLeft,elBottom)
            },
            //移出购物车
            removeOutCart(category_id, item_id, food_id, name, price){
                if(this.foodNum > 0){
                    this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price})
                }

            }

        }


    }
</script>
<style scoped lang="less">
    .cart_module{
            .add_icon{
                width: 20px;
                height: 20px;
            }
        span i{
            color: #fff;
            font-size: 20px;
            background:#3190e8;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            padding: 1px 0 0;

        }
        .cart_num{
            font-size: 16px;
            min-width: 24px;
            color: #666;
            text-align: center;
        }
        .specs_reduce_icon i{
            color: #999;
        }
        .cart_button{
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .choose_specification{
            .choose_icon_container{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .show_chooselist{
                    display: block;
                    font-size: 12px;
                    color: #fff;
                    padding: 2px 4px;
                    background-color: #3190e8;
                    border-radius: 2px;
                    border: 1px solid #3190e8;
                }
            }
        }

    }
</style>