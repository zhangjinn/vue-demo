<template>
    <div>
        <head-top head-title="订单" goBack="true"></head-top>
        order
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import headTop from '@/components/header/head.vue'
    import footGuide from '@/components/footer/footGuide.vue'
    export default {
        name: "order",
        components: {
            headTop,
            footGuide
        }
    };
</script>