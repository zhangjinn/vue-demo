<template>
    <footer class="footer">
        <van-tabbar v-model="footerActive">
            <van-tabbar-item icon="shop" @click="gotoAddress({path:`/goods`})">商品</van-tabbar-item>
            <van-tabbar-item icon="chat" @click="gotoAddress({path:`/search`})">搜索</van-tabbar-item>
            <van-tabbar-item icon="records" @click="gotoAddress({path:`/order`})">订单</van-tabbar-item>
            <van-tabbar-item icon="gold-coin" @click="gotoAddress({path:`/profile`})">我的</van-tabbar-item>
        </van-tabbar>
    </footer>

</template>
<script>

    export default {
        data() {
            return {

            }
        },
        watch:{/* watch监听路由变化 当路由改变时，运行routeHandle函数*/
            $route:'routeHandle'
        },
        created(){
            this.routeHandle(this.$route)
        },
        computed:{
            footerActive:{
                get(){ return this.$store.state.footerActive },
                set(val){ this.$store.dispatch('aFooterActive',val) }
            }
        },
        methods:{
            routeHandle(route){
                console.log(route);
                if(route.meta.fActive>=0){
                    var tab=route.meta.fActive;
                    this.footerActive=tab;
                }
            },
            gotoAddress(path){
                this.$router.push(path)
            }

        }
    }


</script>
<style lang="less" scoped>
    .fg-active{
        color: red;
    }
</style>