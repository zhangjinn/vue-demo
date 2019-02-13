import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Vant from 'vant';
import 'vant/lib/index.css';
import "./config/rem"
import { Lazyload } from 'vant';
import axios from 'axios';
import './assets/style/swiper.min.css'
import './assets/style/main.less'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

//配置前端请求路径
const configPath = '/src/mock/';
window.configPath = configPath;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
