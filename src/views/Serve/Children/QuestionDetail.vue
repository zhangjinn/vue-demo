<template>
    <div class="detail_page">
        <head-top :head-title="question.title" goBack="true">
            <span slot='lt-logo' class="lt-logo">
                <van-icon name="arrow-left" />
            </span>
        </head-top>
        <section id="scroll_section" class="container">
            <div v-html="markdownText" class="markdown">
            </div>
        </section>
    </div>

</template>
<script>
    import {mapState} from 'vuex';
    import headTop from '../../../components/header/head'
    import showdown from 'showdown'
    import BScroll from 'better-scroll'
    export default {
        props: [],
        components:{
            headTop
        },
        mounted(){
            this.$nextTick(()=>{
                let scroll = new BScroll('#scroll_section',{
                    deceleration: 0.001,
                    bounce: true,
                    swipeTime: 1800,
                    click: true,
                })
            })
        },
        computed:{
            ...mapState([
                'question',
            ]),
            markdownText(){
                //转换markDown格式
                //创建实例
                let converter = new showdown.Converter();
                //进行转换
                return converter.makeHtml(this.question.title);
            }
         },

    }
</script>
<style scoped lang="less">
    .detail_page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
    }
    .container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        padding: 46px 0 0 0;
        text-align: left;
    }
</style>