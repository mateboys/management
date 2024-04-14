import Vue from 'vue';
import Vuex from 'vuex';
import { get } from '@/utils/http';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        row: {
            from: 'PC端', //订单来源
            pay: 1, //是否支付
            unit: '吨', //单位
        },
        isFromDetail: false, //是否从详情页进入
        role: '', //角色
    }, //state相当于组件中的data
    getters: {}, //getters相当于组件中的computed
    mutations: {
        setRow(state, payload) {
            state.row = payload;
        },
        clearRow(state) {
            state.row = {
                from: 'PC端', //订单来源
                pay: 1, //是否支付
                unit: '吨', //单位
            };
        },
        changeIsFromDetail(state, payload) {
            state.isFromDetail = payload;
        },
        setRole(state, payload) {
            state.role = payload;
        },
    }, //mutations相当于组件中的methods
    actions: {
        async getRole({ commit }) {
            let { role } = await get('/getRole');
            commit('setRole', role);
        },
    }, //异步操作
    modules: {}, //模块化
});
