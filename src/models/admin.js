/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-09 10:17:08
 * @LastEditTime : 2020-01-20 16:26:14
 */
import * as Admin from '../services/admin';
import _ from 'lodash';

export default {
    namespace: 'admin',

    state: {
        loading: true,
        // 文集
        collectWord: [], 
        // 当前选中的文集
        curCollectWordKey: '',
        // 文章
        articleList: [],
        // 当前选中的文章
        curArticleKey: '',
        // 文章详情
        currentArt: {},
        // content状态
        contLoading:false,
        // 文章列表状态
        artLoading: false,
        // 编辑器状态
        editorLoading: false,
        // editor类型
        defaultEditor: '',
        // 当前文章使用的编辑器
        currentEditor: '',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({
                type: 'effect:init',
                payload:{}
            })
        },
    },

    effects: {
        *'effect:init'({payload}, {select, put, call}){
            // 获取文集列表
            yield put({type: 'effect:query:collectedWord'});
            // 获取编辑器配置信息
            yield put({type: 'effect:query:editorParams'});
        },
        *'effect:query:editorParams'({payload}, {put, call}){
            const {code, data} = yield call(Admin.editorParams, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                       defalutEditor: data.editor,
                       themeEditor: data.theme,
                        // 权限
                    }
                })
            }
        },
        // 设置编辑器
        *'effect:setting:dedaultEditor'({payload}, {select, put, call}){
            const defalutEditor = yield select(({admin}) => {return admin.defalutEditor});
            const {code, data} = yield call(Admin.defaultEditor, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                       defalutEditor: data.editor,
                    }
                })
            }
        },
        // 文集列表
        *'effect:query:collectedWord'({payload}, {put, call}){
            const {code, data} = yield call(Admin.queryCollectedWordList, payload);
            if(code === 0){
                // 更新文集
                yield put({
                    type:'reducer:update',
                    payload: {
                       collectWord: data || [],
                       curCollectWordKey: !_.isEmpty(data) ? data[0].id : '',
                       loading: false,
                    }
                })
                // 获取文集下的文章列表
                const id = !_.isEmpty(data) ? data[0].id : '';
                yield put({type: 'effect:query:articleList', payload:{id}});
            }
        },
        // 创建文集
        *'effect:created:collectedWord'({payload}, {put, call}){
            yield put({type:'reducer:update',payload: {contLoading: true}});
            const {code, data} = yield call(Admin.cratedCollectedWord, payload);
            if(code === 0){
                yield put({type: 'effect:init'});
            }
        },
        // 删除文集
        *'effect:delete:collectedWord'({payload}, {put, call}){
            yield put({type:'reducer:update',payload: {contLoading: true}});
            const {code, data} = yield call(Admin.delCollectedWord, payload);
            if(code === 0){
                yield put({type: 'effect:init'});
            }
        },
        // 文章列表
        *'effect:query:articleList'({payload}, {put, call}){
            yield put({
                type:'reducer:update',
                payload: {
                    curCollectWordKey: payload.id,
                    currentArt: {}, 
                    contLoading: true,
                }
            });
            const {code, data} = yield call(Admin.queryArticleList, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                        articleList: data || [],
                        curArticleKey: !_.isEmpty(data) ? data[0].id : '',
                        currentArt: data[0] || {},
                        currentEditor: !_.isEmpty(data) ? data[0].currentEditor : '',
                        contLoading: false,
                    }
                })
            }
        },
        // 文章详情
        *'effect:query:articleDetails'({payload}, {select, put}){
            yield put({type:'reducer:update',payload: {editorLoading: true}});

            const data = yield select(({admin}) => {return admin.articleList});
            const curData = data.filter((item, index) => {return item.id == payload.id});

            yield put({
                type:'reducer:update',
                payload: {
                    curArticleKey: payload.id,
                    currentArt: curData[0] || {},
                    currentEditor: curData[0].currentEditor || '',
                    editorLoading: false
                }
            })
        },
        // 创建文章
        *'effect:create:article'({payload}, {select, put, call}){
            yield put({
                type:'reducer:update',
                payload: { 
                    artLoading: true,
                    editorLoading: true,
                }
            });
            const {code, data} = yield call(Admin.cratedArticle, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                        articleList: data || [],
                        curArticleKey: !_.isEmpty(data) ? data[0].id : '',
                        currentArt: data[0] || {},
                        currentEditor: !_.isEmpty(data) ? data[0].currentEditor : '',
                        artLoading: false,
                        editorLoading: false,
                    }
                })
            }
        },
        // 删除文章
        *'effect:delete:article'({payload}, {put, call}){
            yield put({
                type:'reducer:update',
                payload: { 
                    artLoading: true,
                    editorLoading: true,
                }
            });
            const {code, data} = yield call(Admin.delArticle, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                        articleList: data || [],
                        curArticleKey: !_.isEmpty(data) ? data[0].id : '',
                        currentArt: data[0] || {},
                        currentEditor: !_.isEmpty(data) ? data[0].currentEditor : '',
                        artLoading: false,
                        editorLoading: false,
                    }
                })
            }
        },
        // 更新文章
        *'effect:update:currentArt'({payload}, {select, put, call}){
            const currentArt = yield select(({admin}) => {return admin.currentArt});
            const {type, value} = payload;
            if(type == 'title'){
                currentArt.title = value;
            }else{
                currentArt.text = value;
            }
            yield put({
                type:'reducer:update',
                payload: {
                    ...currentArt
                }
            });
        },
        // 移动文章
        *'effect:move:article'({payload}, {put, call}){
            yield put({
                type:'reducer:update',
                payload: { 
                    artLoading: true,
                    editorLoading: true,
                }
            });
            const {code, data} = yield call(Admin.moveArticle, payload);
            if(code === 0){
                yield put({
                    type:'reducer:update',
                    payload: {
                        articleList: data || [],
                        curArticleKey: !_.isEmpty(data) ? data[0].id : '',
                        currentArt: data[0] || {},
                        currentEditor: !_.isEmpty(data) ? data[0].currentEditor : '',
                        artLoading: false,
                        editorLoading: false,
                    }
                })
            }
        },
        // 保存文章
        *'effect:save:article'({payload}, {put, call}){
            const {id, title, text} = payload;
            console.log(id)
        }
    },

    reducers: {
        'reducer:update'(state, {payload}){
            return {...state, ...payload}
        }
    },

};