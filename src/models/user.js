/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-17 15:53:09
 * @LastEditTime : 2019-12-19 14:46:58
 */
import * as User from '../services/user';

export default {
    namespace: 'user',

    state: {
        token: '',
        userinfo: {}
    },

    effects: {
        *'effect:login'({playload}, { put, call, }){
            const {code, data} = yield call(User.login, playload);
            yield put({
				type:'reducer:update',
				payload: {
                    token: data.token,
				    userinfo: data.userinfo
				}
			})
        },
        *'effect:logout'({ playload },{put, call, select}){
            const { code, data } = yield call(User.logout, playload);
            if(code == 0){
                yield put({
                    type: 'reducer:update',
                    payload: {
                        token: '',
				        userinfo: {}
                    }
                })
            }
        }
    },

    reducers: {
		'reducer:update'(state, {payload}){
			return {...state, ...payload}
		},
	},
}