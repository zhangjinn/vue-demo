import Vue from "vue";
import Router from "vue-router";
import App from '../App';
import {baseUrl, routerMode} from '../config/env'
Vue.use(Router);

// @ is an alias to /src
const HelloWorld = r =>require.ensure([],()=>r(require('@/components/HelloWorld')),'HelloWorld');
const goods = r =>require.ensure([],()=>r(require('@/views/Goods/Goods')),'Goods');
const order = r =>require.ensure([],()=>r(require('@/views/Order/Order')),'Order');
const search = r =>require.ensure([],()=>r(require('@/views/Search/Search')),'Search');
const profile = r =>require.ensure([],()=>r(require('@/views/Profile/Profile')),'Profile');
const about = r =>require.ensure([],()=>r(require('@/views/About')),'About');
const shop = r =>require.ensure([],()=>r(require('@/views/Shop/Shop')),'Shop');
const login = r =>require.ensure([],()=>r(require('@/views/Login/Login')),'Login');
const forget = r =>require.ensure([],()=>r(require('@/views/Forget/Forget')),'Forget');


export default new Router({
  mode: routerMode,
  base:baseUrl,
  routes: [
    {
      path: "/",
      component: App, //顶层路由，对应index.html
      children:[ //二级路由， 对应App.vue
        //地址为空时跳转HelloWorld页面
        {
          path: '',
          redirect: '/HelloWorld'
        },

        {
          path: "/HelloWorld",
          name: "HelloWorld",
          component: HelloWorld,
          meta: { title: 'HelloWorld'}
        },
        //商品首页
        {
          path: "/goods",
          name: "goods",
          component: goods,
          meta: { title: '系统首页' ,fActive:0, keepAlive: true}
        },
          //搜索页
        {
          path: "/search",
          name: "search",
          component: search,
          meta: { title: '搜索页', fActive:1}
        },
        //订单页
        {
          path: "/order",
          name: "order",
          component: order,
          meta: { title: '订单页' ,fActive:2}
        },
        //个人页
        {
          path: "/profile",
          name: "profile",
          component: profile,
          meta: { title: '个人信息页' ,fActive:3}
        },
        //商铺详情页
        {
          path: "/shop",
          name: "shop",
          component: shop,
          meta: { title: '商铺详情页'}
        },
        //登录注册页
        {
          path: '/login',
          name: "login",
          component: login
        },
        //修改密码页
        {
          path: '/forget',
          name: "forget",
          component: forget
        },

      ]
    },
    {
      path: "/about",
      name: "about",
      component: about
    }
  ]
});
