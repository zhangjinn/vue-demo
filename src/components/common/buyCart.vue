<template>
    <div>
        <section class="cart_module">
            <section class="cart_button" v-if="!foods.specifications.length">
                <transition name="showReduce">
                    <span v-if="foodNum" @click="removeOutCart()"><i class="icon iconfont icon-jianhao"></i></span>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="add_icon" @click="addToCart($event)"><i class="icon iconfont icon-plus-circle"></i></span>
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

    export default{
        props:['foods'],
        data(){
            return{
                showMoveDot:[] //控制下落的小圆点显示隐藏
            }
        },
        computed:{
            foodNum:function(){
                return 0;
            }
        },
        methods:{
            //移除购物车
            removeOutCart(){
                console.log(111)
            },
            //加入购物车，计算按钮位置
            addToCart(event){
                this.showMoveDot=[];
                let elLeft=event.target.getBoundingClientRect().left;
                let elBottom=event.target.getBoundingClientRect().bottom;
                this.showMoveDot.push(true);
                console.log( this.showMoveDot);
                this.$emit('showMoveDot',this.showMoveDot,elLeft,elBottom)
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