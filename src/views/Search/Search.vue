<template>
    <div>
        <head-top head-title="搜索" goBack="true"></head-top>
        search
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import headTop from '@/components/header/head.vue'
    import footGuide from '@/components/footer/footGuide.vue'
    export default {
        name: "search",
        components: {
            headTop,
            footGuide
        }
    };
</script>