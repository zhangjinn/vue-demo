import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex);

const state={
  footerActive:0, //footer跳转索引
  cartList: {}, // 加入购物车的商品列表
  question:null, //问题详情
};
export default new Vuex.Store({
  state,
  mutations,
  actions
});
