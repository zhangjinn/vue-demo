/**
 * Created by zhangjinjin on 2018/12/17.
 */
import {
    FOOTER_ACTIVE ,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    SAVE_QUESTION
} from './mutation-types'

import {setStore, getStore} from '@/config/mUtils.js'

export default{
    //底部标签栏状态变化
    [FOOTER_ACTIVE](state,index) {
        state.footerActive=index
    },
    //加入购物车
    [ADD_CART](state,{shopid, category_id , item_id, food_id, name, price}){
        let cart = state.cartList;
        let shop = cart[shopid] = (cart[shopid] || {});
        let category = shop[category_id] = (shop[category_id] || {});
        let item = category[item_id] = (category[item_id] || {});
        if(item[food_id]){
            item[food_id]['num']++;
        }else{
            item[food_id]={
                "num":1,
                "name":name,
                "price":price
            }
        }
        state.cartList = {...cart};
        //存入localStorage
        setStore('buyCart', state.cartList);
    },
    [REDUCE_CART](state,{shopid, category_id , item_id, food_id, name, price}){
        let cart = state.cartList;
        let shop = (cart[shopid] || {});
        let category = (shop[category_id] || {});
        let item = (category[item_id] || {});
        if(item && item[food_id]){
            if(item[food_id]['num'] > 0){
                item[food_id]['num']--;
                state.cartList = {...cart};
                //存入localStorage
                setStore('buyCart', state.cartList);
            }else{
                //商品数量为0，则清空当前商品的信息
                state.cartList={};
            }

        }


    },
    //网页初始化时从本地缓存获取购物车数据
    [INIT_BUYCART](state){
        let initCart=getStore('buyCart');
        if(initCart){
            state.cartList=JSON.parse(initCart);
        }
    },
    //清空当前商品的购物车信息
    [CLEAR_CART](state,shopid){
        state.cartList={};
        state.cartList={...state.cartList};
        setStore('buyCart', state.cartList);
    },
    //保存所有问题标题和详情
    [SAVE_QUESTION](state, question){
        state.question = {...question}
    }

}