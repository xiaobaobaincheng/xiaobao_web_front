/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-24 09:29:19
 * @LastEditTime : 2019-12-24 10:39:34
 */
import React, { Component } from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch, Redirect } from 'dva/router';

class RouterMap extends Component {
    render() {
        const { routes, history, app } = this.props;
        const defaultRoute = <Redirect from="/" to="/home" key={'default'} exact ></Redirect>;
        return <Router history={history}>
                    <Switch>
                        {
                            routes.map(({path,name,children, ...dynamics}, index) => (
                                <Route key={name} path={path} component={dynamic({app, ...dynamics})}/>
                            ))
                        }

                    </Switch>
                </Router>
    }
}
export default RouterMap;
