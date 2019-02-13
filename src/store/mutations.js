/**
 * Created by zhangjinjin on 2018/12/17.
 */
const FOOTER_ACTIVE='FOOTER_ACTIVE';
export default{
    //底部标签栏状态变化
    [FOOTER_ACTIVE](state,index) {
        state.footerActive=index
    }
}