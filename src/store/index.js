import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex);

const state={
  footerActive:0
};
export default new Vuex.Store({
  state,
  mutations,
  actions
});
