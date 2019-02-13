/**
 * Created by zhangjinjin on 2018/12/10.
 */
//很多人写这种小工具文件会习惯性的加上闭包，这个其实是没有必要的。ES6中每个文件都是单独的一个模块。

/*
* method one
* */
// 基准大小
const baseSize = 32;
// 设置 rem 函数
function setRem () {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750;
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
};


/*
 * method two
 * */
//window.onresize = setHtmlFontSize;
//function setHtmlFontSize(){
//    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//    const htmlDom = document.getElementsByTagName('html')[0];
//    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
//}
//setHtmlFontSize();