import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Vant from 'vant';
import Cube from 'cube-ui';
import 'vant/lib/index.css';
import "./config/rem"
import { Lazyload } from 'vant';
import './assets/style/swiper.min.css'
import './assets/style/main.less'
import http from './service/http'


Vue.use(Cube);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

//配置前端请求路径
const configPath = '/src/mock/';
window.configPath = configPath;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
