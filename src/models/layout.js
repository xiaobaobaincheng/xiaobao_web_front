/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-16 16:27:49
 * @LastEditTime : 2020-01-06 09:20:27
 */

export default {

	namespace: 'layouts',

	state: {
		headerFi: false
	},

	subscriptions: {
		setup({ dispatch, history }) {  // eslint-disable-line
			dispatch({type: 'effect:init'})
		},
	},

	effects: {
		*'effect:init'({payload}, {call, put}){
			yield put({
				type:'reducer:update',
				payload: {
				showFirstFloor: true
				}
			})
		},
		*'effect:change'({payload}, {call, put, select}){
			const show = yield select(({layouts}) => layouts.showFirstFloor);
			console.log(show)
			yield put({
				type:'reducer:update',
				payload: {
				showFirstFloor: !show
				}
			})
		}
	},

	reducers: {
		'reducer:update'(state, {payload}){
			return {...state, ...payload}
		},
	},

};
