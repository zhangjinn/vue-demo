<template>
    <div class="loginContainer">
        <head-top head-title="登录" goBack="true">
            <span slot='lt-logo' class="lt-logo">
                <van-icon name="arrow-left" />
            </span>
             <span slot='rg-logo' class="rg-logo" @click="changeLoginWay">
                <span v-if="loginWay">
                    短信登录
                </span>
                 <span v-else>
                   密码登录
                 </span>
            </span>
        </head-top>
        <div class="page-wrapper">
            <div class="home-wrapper">
                <van-cell-group v-if="loginWay">
                    <van-field
                            v-model="smsLoginForm.phoneNumber"
                            label="手机号"
                            maxlength="11"
                            placeholder="请输入手机号"
                    />
                    <van-field
                            v-model="smsLoginForm.verificationCode"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                            maxlength="6"
                    >
                        <van-button @click="getVerifyCode" slot="button" size="small" type="primary" v-show="!computedTime">获取验证码</van-button>
                        <van-button slot="button" size="small" type="primary" v-show="computedTime">已发送（{{computedTime}}s）</van-button>
                    </van-field>
                </van-cell-group>
                <form v-else>
                    <div class="van-cell-group">
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>账号</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请输入账号" v-model.lazy="loginForm.username" class="van-field__control">
                                </div>
                            </div>
                        </div>
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>密码</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input v-if="!switchChecked" type="password" placeholder="请输入密码" v-model="loginForm.password" class="van-field__control">
                                    <input v-else type="text" placeholder="请输入密码" v-model="loginForm.password" class="van-field__control">
                                    <div class="button_switch">
                                        <van-switch
                                                v-model="switchChecked"
                                                size="24px"
                                                active-color="#07c160"
                                                @change="switchChange"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>验证码</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请输入验证码" maxlength="4" v-model="loginForm.picVerificationCode" class="van-field__control">
                                    <div class="Verification">
                                        <img v-show="picVerificationSrc" :src="picVerificationSrc" alt="">
                                        <div class="verificationChange" @click="getVerificationCode">
                                            <p>看不清</p>
                                            <p>换一张</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="login_container" @click="sendLoginInfo">登录</div>
                <router-link to="/forget" v-if="!loginWay">重置密码？</router-link>
            </div>
        </div>

    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import {getCaptchas, getMobileCode} from '../../service/getData.js'

    import img1 from '@/assets/img/pic1.jpg'
    export default {
        props: [],
        data(){
            return{
                smsLoginForm:{
                    phoneNumber:'',
                    verificationCode:'',
                },
                loginForm:{
                    username:'',
                    password:'',
                    picVerificationCode:'',
                },
                loginWay:false, //登录方式，默认短信登录
                picVerificationSrc:null,
                showPassword:false,
                switchChecked:false,
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                validate_token: null, //获取短信时返回的验证值，登录时需要
                img:img1,
            }
        },
        created(){
            this.getVerificationCode();
        },
        components: {
            headTop
        },
        computed:{
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.smsLoginForm.phoneNumber)
            }
        },
        methods:{
            /*获取短信验证码*/
            getVerifyCode(){
                let that = this;
                if(this.rightPhoneNumber){
                    this.computedTime = 30;
                    this.timer = setInterval(() => {
                        that.computedTime--;
                        if(that.computedTime == 0){
                            clearInterval(that.timer);
                        }
                    },1000)

                    //发送验证码
//                    let result=await getMobileCode({
//                        mobile: this.smsLoginForm.phoneNumber,
//                        scene: 'login',
//                        type: 'sms'
//                    });
//                    console.log(result)
                }else{
                    this.$dialog.alert({
                        message: '请输入正确格式的手机号',
                        messageAlign:'center',
                    });
                }

            },
            /*获取图片验证码路径*/
            async getVerificationCode(){
                let result=await getCaptchas();
                console.log(result)
                this.picVerificationSrc=result.code;

            },

            /*登录*/
            async sendLoginInfo(){
                    if(this.loginWay){
                         if(!this.rightPhoneNumber){
                             this.$dialog.alert({
                                 message: '手机号码不正确',
                                 messageAlign:'center',
                             });
                         }else if(!(/^\d{6}$/gi.test(this.smsLoginForm.verificationCode))){
                             this.$dialog.alert({
                                 message: '短信验证码不正确',
                                 messageAlign:'center',
                             });
                         }else{
                             //手机号登录
//                             this.userInfo = await sendLogin(this.smsLoginForm.verificationCode, this.smsLoginForm.phoneNumber, this.validate_token);
                             this.$router.go(-1);
                         }

                    }else{
                        if(!this.loginForm.username){
                            this.$dialog.alert({
                                message: '请输入手机号/邮箱/用户名',
                                messageAlign:'center',
                            });
                        }else if(!this.loginForm.password){
                            this.$dialog.alert({
                                message: '请输入密码',
                                messageAlign:'center',
                            });
                        }else if(!this.loginForm.picVerificationCode){
                            this.$dialog.alert({
                                message: '请输入验证码',
                                messageAlign:'center',
                            });
                        }else{
                            //用户名登录
//                            this.userInfo = await accountLogin(this.loginForm.username, this.loginForm.password, this.loginForm.picVerificationCode);
                            this.$router.go(-1);
                        }
                    }
            },
            changeLoginWay(){
                this.loginWay = !this.loginWay
            },
            /*密码显示开关改变状态 */
            switchChange(checked){
                console.log('checked--'+checked)
                this.switchChecked=checked;
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/style/mixin";
    .page-wrapper{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
        transform: rotate(0deg);
        overflow: hidden;
        .home-wrapper {
            height: 100%;
            padding: 56px 0 50px 0;
            .van-cell {
               text-align: left;
                height:60px;
                align-items: center;
                .Verification{
                    display: flex;
                    align-items: center;
                    .verificationChange{
                        width: 60px;
                        p:nth-child(2){
                            color:#3b95e9;
                        }
                    }
                }
            }
            .login_container{
                margin: 1rem .5rem 1rem;
                font-size: 16px;
                color: #fff;
                background-color: #4cd964;
                padding: 1rem 0;
                border: 1px;
                border-radius: 0.15rem;
                text-align: center;
            }
        }
    }
    .van-dialog{
        text-align: center;
    }
</style>