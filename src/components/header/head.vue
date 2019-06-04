<template>
        <van-nav-bar
                :title="headTitle"
                fixed
                @click-left="onClickLeft"
                @click-right="onClickRight"
                :z-index=zIndex >
            <slot name="lt-logo"  slot="left"></slot>
            <slot name="rg-logo"  slot="right"></slot>
        </van-nav-bar>
</template>
<script>
    export default{
        data(){
          return{
              zIndex:2
          }
        },
        props:['headTitle','goBack'],
        methods: {
            onClickLeft() {
                if(this.goBack == "true"){
                    this.$router.go(-1);
                }

            },
            onClickRight() {
            }
        }
    }
</script>
<style lang="less" scoped>

</style>