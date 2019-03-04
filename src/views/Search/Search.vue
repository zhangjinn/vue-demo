<template>
    <div>
        <!--<head-top head-title="搜索" goBack="true"></head-top>-->

        <section>
            <div class="shop-nav">
                <div class="shop-nav-content">
                    <nav>
                        <a href=""></a>
                    </nav>
                    <div class="shop-summary">
                        <div class="shop-summary-img">
                            <span><span>品牌</span></span>
                            <img src="" alt="">
                        </div>
                        <div class="shop-summary-name">
                            <h2 class="shop-summary-position">
                                <span>好嫂子（回龙观店）</span>
                                <i class=""></i>
                            </h2>
                            <div>
                                <span class="shop-summary-evaluate">评价4.8</span>
                                <span class="shop-summary-sale">月售2597单</span>
                                <span class="shop-summary-delivery">蜂鸟专送约33分钟</span>
                            </div>
                        </div>
                        <div class="shop-summary-favourable">
                            <div class="favourable-refine">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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