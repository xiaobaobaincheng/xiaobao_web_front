/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-12 15:17:46
 * @LastEditTime : 2020-01-09 13:41:00
 */
import * as Catgary from '../services/catgary.js';

export default {
    namespace: 'catgary',

    state: {
        data: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({
                type: 'effect:init',
            })
        },
    },

    effects: {
        *'effect:init'({payload}, {put, call}){
            console.log(111)
            const {code, data} = yield call(Catgary.getCatgary, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                       data: data
                    }
                })
            }
        },
    },

    reducers: {
        'reducer:update'(state, {payload}){
            return {...state, ...payload}
        }
    },

};
