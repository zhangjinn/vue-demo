/**
 * Created by zhangjinjin on 2018/12/10.
 */
module.exports={
    plugins: {
        'autoprefixer': { // 添加浏览器前缀
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
            rootValue: 16, // 根大小37.5  //750px * 1334px
            propList: ['*'],  // 属性的选择器，*表示通用
            selectorBlackList:[ //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
                //'.ig-','.vux-','.weui-','scroller-','.mint-','.van-'
            ]
        }
    }
};