/**
 * Created by zhangjinjin on 2019/5/14.
 */
//import Vue from "vue";
import http from './http.js'
//Vue.prototype.$http = http;


/*
* 首页
* */
//获取轮播食物类型
export const getFoodTypes = (data) => {
    const url = '/foo/mock/goodsList';
    return http.get(url, data);
};
//获取店铺列表数据
export const getRestaurantsInfo = (data) => {
    const url = '/foo/vDemo/restaurants';
    return http.get(url, data);
};

/*
* shop页
* */
//获取评论列表
export const getRatingList = (data) => {
    const url = '/foo/rateList';
    return http.get(url, data);
};

/*
* 登录页
* */
//获取图片验证码路径
export const getCaptchas = (data) => {
    const url = 'https://elm.cangdu.org/v1/captchas';
    return http.post(url, data);
};
//获取短信验证码
export const getMobileCode = (data) => {
    const url = 'https://elm.cangdu.org/v4/mobile/verify_code/send';
    return http.post(url, data);
};
//手机号登录
export const sendLogin = (data) => {
    const url = 'https://elm.cangdu.org/v1/login/app_mobile';
    return http.post(url, data);
};


