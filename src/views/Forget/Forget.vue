<template>
    <div class="loginContainer">
        <head-top head-title="重置密码" goBack="true">
            <span slot='lt-logo' class="lt-logo">
                <van-icon name="arrow-left" />
            </span>
        </head-top>
        <div class="page-wrapper">
            <div class="home-wrapper">
                <form>
                    <div class="van-cell-group">
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>账号</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请输入账号" v-model.lazy="loginForm.username" maxlength="11" @input="inputPhone" class="van-field__control">
                                </div>
                            </div>
                        </div>
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>旧密码</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请输入旧密码" v-model="loginForm.oldPassword" class="van-field__control">
                                </div>
                            </div>
                        </div>
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>新密码</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请输入新密码" v-model="loginForm.newPassword" class="van-field__control">
                                </div>
                            </div>
                        </div>
                        <div class="van-cell van-field">
                            <div class="van-cell__title">
                                <span>确认密码</span>
                            </div>
                            <div class="van-cell__value">
                                <div class="van-field__body">
                                    <input type="text" placeholder="请确认密码" v-model="loginForm.confirmPassWord" class="van-field__control">
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
                <div class="login_container" @click="resetLoginInfo">确认修改</div>
            </div>
        </div>

    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import {getCaptchas, getMobileCode} from '../../service/getData.js'
    export default {
        props: [],
        data(){
            return{
                loginForm:{
                    username:'',
                    oldPassword:'',
                    newPassword:'',
                    confirmPassWord:'',
                    picVerificationCode:'',
                },
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                picVerificationSrc:null,
            }
        },
        created(){
            this.getVerificationCode();
        },
        components:{
            headTop
        },
        methods:{
            //判断输入的电话号码
            inputPhone(){
                if(/.+/gi.test(this.loginForm.username)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                }
            },
            /*获取图片验证码路径*/
            async getVerificationCode(){
                let result=await getCaptchas();
                console.log(result)
                this.picVerificationSrc=result.code;

            },
            //重置密码
            resetLoginInfo(){
                console.log(11)
                if(!this.loginForm.username){
                    this.$dialog.alert({
                        message: '请输入正确的账号',
                        messageAlign:'center',
                    });
                }else if(!this.loginForm.oldPassword){
                    this.$dialog.alert({
                        message: '请输入旧密码',
                        messageAlign:'center',
                    });
                }else if(!this.loginForm.newPassword){
                    this.$dialog.alert({
                        message: '请输入新密码',
                        messageAlign:'center',
                    });
                }else if(!this.loginForm.confirmPassWord){
                    this.$dialog.alert({
                        message: '请输确认密码',
                        messageAlign:'center',
                    });
                }else if(this.loginForm.newPassword !== this.loginForm.confirmPassWord){
                    this.$dialog.alert({
                        message: '两次输入的密码不一致',
                        messageAlign:'center',
                    });
                }else if(!this.loginForm.picVerificationCode){
                    this.$dialog.alert({
                        message: '请输验证码',
                        messageAlign:'center',
                    });
                }else{
                    this.$dialog.alert({
                        message: '密码修改成功',
                        messageAlign:'center',
                    });
                }
                   //发送重置信息
//                    let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
//                    if (res.message) {
//                        this.getCaptchaCode()
//                    }

            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="less" scoped>
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