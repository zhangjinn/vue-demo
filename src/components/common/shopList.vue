<template>
    <div class="shoplist_container">
        <router-link :to="{ path: 'shop'}" v-for="(item,index) in restaurantsList" :key="index" tag="section" class="shoplist_info" >
                <div class="shoplist_info_introduce">
                    <div class="shoplist_logo">
                        <img :src="item.image_path" alt="" >
                    </div>
                    <div class="shoplist_main">
                        <section class="shoplist_main_name">
                            <h3><i class="icon iconfont icon-dingweiweizhi"></i><span class="ellipsis">{{item.name}}</span></h3>
                            <ul><span>···</span></ul>
                        </section>
                        <section class="shoplist_main_star">
                            <div class="shoplist_main_rateWrap">
                                <div>fivestars</div>
                                <span class="rating_section">{{item.rating}}</span>
                                <span class="order_section">月售{{item.recent_order_num}}单</span>
                            </div>
                            <div class="shoplist_main_delivery">
                                <span class="delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                                <span class="delivery_right">准时达</span>
                            </div>
                        </section>
                        <section class="shoplist_main_send">
                            <div class="moneylimit">
                                <span>￥{{item.float_minimum_order_amount}}起送</span>
                                <span>配送费￥{{item.float_delivery_fee}}</span>
                            </div>
                            <div class="timedistanceWrap">
                                <span class="distanceWrap" v-if="Number(item.distance)">{{item.distance > 1000 ? (item.distance/1000).toFixed(2)+'km' : item.distance + 'm'}}</span>
                                <span class="distanceWrap" v-else>{{item.distance}}</span>
                                <span class="timeWrap">{{item.order_lead_time}}</span>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="shoplist_info_activity">
                    <section class="activity_tagLine">
                        <span class="mini-tag" v-for="(item,index) in item.support_tags" :key="index" >{{item.text}}</span>
                    </section>
                    <span></span>
                    <section class="activities_listWrap" >
                        <div class="activityList" >

                            <div class="actRow" v-for="(item,i) in item.activities" :key="i" v-show="showList[index] ? i>=0 : i<=1" >
                                <span class="actRow_iconWrap">{{item.icon_name}}</span>
                                <span class="actRow_desc ellipsis">{{item.description}}</span>
                            </div>
                        </div>
                        <div class="activityBtn" @click.stop="activitiesShow(index)" v-if="item.activities.length>2" >
                            <div>
                                <span>{{item.activities.length}}个活动</span>
                                <span class="showIcon"><i class="icon iconfont icon-xialajiantou"  :class="{ selectedActivity : showList[index] }"></i></span>
                            </div>
                        </div>
                    </section>
                </div>
        </router-link>
    </div>
</template>
<script>
    export default{
        props:{
            restaurants:{
                type:Array,
                required:true
            }
        },
        data(){
            return{
                list: [],
                restaurantsList:[],
                showList:[],//列表活动是否全部显示
                shopListIndex:0
            }
        },
        mounted(){

        },
        watch:{
            restaurants:{
                handler(val,oldVal){
                    console.log(val);
                    this.restaurantsList=val;
                    this.$nextTick(function() {
                        this.executeTask();
                    });

                },
                immediate:true,//关键
                deep:true
            }
        },
        methods:{
            executeTask(){
                this.showList=[];
                for(var i=0;i<this.restaurantsList.length;i++){
                    this.showList.push(false);
                }
            },
            activitiesShow(index){
                 this.showList.splice(index,1,!this.showList[index]);
            }

        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/style/mixin";

    .shoplist_container{
        .shoplist_info{
            background-color: #fff;
            color: #666;
            font-size: 12px;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        &_introduce{
             display: flex;
             justify-content: flex-start;
             align-items: stretch;
             padding: 0 10px;
            .shoplist_logo{
                .wh(80px,80px);
                img{
                .wh(100%,100%);
                }
            }
            .shoplist_main{
                flex: 1;
                display: flex;
                flex-direction: column;
                padding-left: 8px;
                overflow: hidden;
                .shoplist_main_name{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    h3{
                        flex: 1;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        color: #333;
                        font-weight: bold;
                        font-size: 16px;
                        span{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    ul{
                        margin-left: 10px;
                    }
                }
                .shoplist_main_star{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    margin:8px 0;
                    .shoplist_main_rateWrap{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .rating_section{
                            color: #ff6000;
                            margin: 0 4px;
                        }
                        .order_section{
                            transform: scale(0.8);
                            margin-left: -4px;
                        }
                    }
                    .shoplist_main_delivery{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        transform:scale(0.75);
                        margin-right:-12px;
                        span{
                            border: 1px solid #3190e8;
                            padding: 2px;
                            .border-radius(2px);
                            margin-left: 2px;

                        }
                        .delivery_left{
                            background-color: #3190e8;
                            color: #fff;
                        }
                        .delivery_right{
                            background-color:#fff;
                            color:  #3190e8;
                        }
                    }
                }

                .shoplist_main_send{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    .moneylimit{
                        transform:scale(0.9);
                        margin-left: -8px;
                        span:nth-of-type(2):before{
                            margin:0 4px;
                            color: #ddd;
                            content: "|";
                        }
                    }
                    .timedistanceWrap{
                        color: #999;
                        transform:scale(0.9);
                        margin-right: -2px;
                        span:nth-of-type(1):after{
                            margin:0 4px;
                            color: #ddd;
                            content: "|";
                        }
                    }
                }
            }
         }

        }


        .shoplist_info_activity{
            margin-left: 100px;
            .activity_tagLine{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                span{
                    padding: 2px;
                    border:1px solid #999;
                    .border-radius(2px);
                    white-space: nowrap;
                    transform: scale(0.9);
                }
            }
            >span{
                .wh(100%,10px);
                 display: block;
                 border-bottom: 1px solid #eee;
                 margin-bottom: 4px;
             }
             .activities_listWrap{
                 display: flex;
                 justify-content: space-between;
                 align-items: stretch;
                 overflow: hidden;
                 .activityList{
                     flex: 1;
                     overflow: hidden;
                     padding-right: 8px;
                     .actRow{
                         display: flex;
                         align-items: center;
                         .actRow_iconWrap{
                             background-color: rgb(240, 115, 115);
                             color: #fff;
                             padding: 1px;
                             margin-right: 4px;
                             .border-radius(2px);
                         }

                     }
                    .actRow:not(:first-child){
                        margin-top: 6px;
                    }
                    .hideActive{
                        display: none;
                    }
                 }
                 .activityBtn{
                     color: #999;
                     text-align: right;
                     padding: 0 4px 0 0;
                     i{
                         display: inline-block;
                         font-size: 12px;
                         margin-left:4px;
                         transform: rotate(0deg);
                         /*transition: all .3s ease-in-out;*/

                     }
                      i.selectedActivity{
                         transform: rotate(180deg);
                     }

                 }
             }
        }

    }



</style>