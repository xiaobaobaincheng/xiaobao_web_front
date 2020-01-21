/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-12 15:17:46
 * @LastEditTime : 2020-01-09 13:41:57
 */
import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch, Redirect  } from 'dva/router';
function RouterConfig({ history, app }) {
    
	const MyLayout = dynamic({
		app,
		models: () => [
            import('./models/layout.js'),
            import('./models/user.js'),    
        ],
		component: () => import('../src/layout'),
	})
	const Home = dynamic({
		app,
		models: () => [
            import('./models/article.js'),
            import('./models/catgary.js')
        ],
		component: () => import('../src/routes/home')
	})
	const Login = dynamic({
		app,
		models: () => [import('./models/user.js')],
		component: () => import('../src/routes/login')
	})
    const Detail = dynamic({
		app,
		models: () => [import('./models/article.js')],
		component: () => import('../src/routes/details')
	})
	const NotFound = dynamic({
		app,
		models: () => [],
		component: () => import('../src/routes/404')
	})
    const EditArticle = dynamic({
        app,
        models: () => [import('./models/admin.js')],
        component:() => import('../src/routes/editArticle')
    })
    
	return (
		<Router history={history} >
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" render = { () =>
                    <MyLayout history={history}>
                        <Switch>
                            <Route path="/home/:id" exact component={Home}/>
                            <Route path="/home/details/:id" exact component={Detail}/>
                            <Redirect from="/home" to={'/home/all'} key={'default'} exact/>
                            <Route component={NotFound}/>
                        </Switch>
                    </MyLayout>
                }/>
                <Route path="/editArticle" component={EditArticle}/>
                <Redirect from="/" to={'/home/all'} key={'default'} exact/>
                <Route path="*" component={NotFound}/>
            </Switch>
		</Router>
	);
}

module.exports = RouterConfig;
