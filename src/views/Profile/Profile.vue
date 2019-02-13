<template>
    <div>
        <head-top head-title="我的" goBack="true"></head-top>
        profile
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import headTop from '@/components/header/head.vue'
    import footGuide from '@/components/footer/footGuide.vue'
    export default {
        name: "profile",
        components: {
            headTop,
            footGuide
        }
    };
</script>