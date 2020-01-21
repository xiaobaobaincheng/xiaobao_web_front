/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-12 15:17:46
 * @LastEditTime : 2019-12-30 18:00:34
 */
import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';

// store数据持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';//使用localStorage存储
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
// 路由
import { createHashHistory as createHistory } from 'history';
import RouterConfig from './router.js';
// import RouterConfig from '../src/router/index';

import './gloable.less';

// 1. Initialize
const app = dva({
	history: createHistory(),
    onReducer(reducer) {
        const persistConfig = {
            key: 'root',
            storage,
            stateReconciler: autoMergeLevel2,
            whitelist:['user'], // 存储白名单
        }
        return persistReducer(persistConfig, reducer)
    },
	onError(err) {
		message.error(err.message)
	},
});

window.onload = () => {
    persistStore(app._store);
}


// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(model);

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');
