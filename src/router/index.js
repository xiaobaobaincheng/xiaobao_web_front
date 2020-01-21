/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-24 09:29:39
 * @LastEditTime : 2019-12-24 10:35:54
 */
import React from 'react';
import RouterMap from './map.js';
import Routes from './routes.js';

//dva的Routerview 只能是一个函数
function RouterView(props) {
    const routes = props.routes ? props.routes : Routes;
    return <RouterMap routes={routes} {...props}></RouterMap>
}

export default RouterView;
