<template>
    <div>
        <head-top head-title="服务中心" goBack="true">
            <span slot='lt-logo' class="lt-logo">
                <van-icon name="arrow-left" />
            </span>
        </head-top>
        <section>
            <div class="container">
                <van-cell-group>
                    <van-cell v-for="(item,index) in questionTitle" :key="index" :title="item" is-link @click.native="toQuestionDetail(item,index)" />
                </van-cell-group>
            </div>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import headTop from '../../components/header/head'

    export default {
        props: [],
        data(){
          return{
              questionTitle:['title11','title22','title33','title44'] , //问题标题
              questionDetail:['title111gfgdfffdgfgfvfvfvfvfvfvfvffvgsfdsfdsfdsfdfdsfsdfdfsdsfdfsfdsfsd','title22','title33','title44']  //问题标题
          }
        },
        components:{
            headTop
        },

        methods:{
            ...mapMutations([
                'SAVE_QUESTION'
            ]),
            //保存并显示问题详情
            toQuestionDetail(title,index){
                this.SAVE_QUESTION({title:title});
                this.$router.push('/serve/questionDetail')
            }
        }
    }
</script>
<style lang="less" scoped>
    .container{
        padding: 46px 0 0 0;
        text-align: left;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>