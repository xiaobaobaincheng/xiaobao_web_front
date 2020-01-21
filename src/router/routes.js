/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-13 14:44:10
 * @LastEditTime : 2019-12-24 10:34:02
 */
 
import Home from '../routes/home';
import Login from '../routes/login';
import Detail from '../routes/details';

export default [
    {
        path: '/home',
        name: 'home',
        models: () => [
            import('../models/list.js'),
            import('../models/catgary.js')
        ],
        component: Home,
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
    },
    {
        path: '/login',
        name: 'login',
        models: () => [
            import('../models/user.js')
        ],
        component: Login,
    },
]


