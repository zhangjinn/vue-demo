<template>
    <header class="header">
        <van-nav-bar
                :title="headTitle"
                fixed
                @click-left="onClickLeft"
                @click-right="onClickRight">
            <slot name="lt-logo"  slot="left"></slot>
            <slot name="rg-logo"  slot="right"></slot>
        </van-nav-bar>
    </header>

</template>
<script>
    export default{
        props:['headTitle','goBack'],
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
            }
        }
    }
</script>