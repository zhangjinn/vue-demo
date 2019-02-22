<template>
    <div class="loading_container">
        <div class="load_img" :style="{backgroundPositionY:-(positionY%7)*50 + 'px'}"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                positionY:0,
                timer:null

            }
        },
        mounted(){
            this.timer=setInterval(()=>{
                this.positionY ++
            },600)
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/style/mixin";
    @keyframes load{
        0%   {transform: translateY(0px);}
        50%  {transform: translateY(-50px);}
        100% {transform: translateY(0px);}
    }
    @keyframes ellipse{
        0%   {transform: scale(1);}
        50%  {transform: scale(0.3);}
        100% {transform: scale(1);}
    }
    .loading_container{
        position: fixed;
        top: 50%;
        left: 50%;
        .wh(50px, 50px);
        transform: translate(-50%, -50%);
        z-index: 11;
    }
    .load_img{
        .wh(100%, 100%);
        background: url(../../assets/img/icon_loading.png) no-repeat 0 0;
        background-size: 50px auto;
        transform: translateY(0px);
        animation: load .6s infinite ease-in-out;
        position: relative;

    }

</style>