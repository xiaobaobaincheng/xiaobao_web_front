/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-19 14:15:47
 * @LastEditTime : 2019-12-25 15:26:30
 */
import * as Article from '../services/article';
import _ from 'loadsh';

export default {
    namespace: 'article',

    state: {
        loading: false, //加载状态
        dataSource: [], //数据集合
        pagination: {   // 分页信息
            pageSize: 10,
            currentPage: 1,
            total: null,
        },
        detailsData: {},//详情
    },

    subscriptions: {
        setup({dispatch, history}) {}
    },

    effects: {
        *'effect:list'({payload}, {call, put, select}){
            if(payload.currentPage === 1){
                yield put({
                    type:'reducer:update',
                    payload:{
                        dataSource: [],
                        pagination: {   // 分页信息
                            pageSize: 10,
                            currentPage: 1,
                            total: null,
                        },
                    }
                });
            }
            yield put({type:'reducer:update',payload:{loading: true}});

            const {code, data} = yield call(Article.getList, payload);
            if(code == 0){
                const dataList = yield select(({article}) => {return article.dataSource});
                yield put({
                    type: 'reducer:update',
                    payload: {
                        loading: false,
                        dataSource: dataList.concat(data.data),
                        pagination: {
                            pageSize: data.pageSize,
                            currentPage: data.currentPage,
                            totalPage: data.totalPage,
                            total: data.total,
                        },
                    }
                })
            }
            return data;
        },
        *'effect:details'({payload}, {call, put, select}){
            const {code, data} = yield call(Article.getDetails, payload);
            if(code === 0){
                yield put({
                    type: 'reducer:update',
                    payload: {
                        detailsData: data,
                    }
                })
            }
        }
    },

    reducers: {
        'reducer:update'(state, {payload}){
            return {...state, ...payload}
        }
    }
}