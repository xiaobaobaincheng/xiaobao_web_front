/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-13 14:44:10
 * @LastEditTime : 2019-12-27 16:52:43
 */
const logo = require('./assets/yay.jpg');

const navMenu = [
    {
        path: '/home/',
        name: '首页'
    },
    {
        path: '/question',
        name: '问答'
    },
    {
        path: '/active',
        name: '活动'
    },
]
const userSetMenu = [
    {
        id: '1',
        name: '我的关注',
    },
    {
        id: '2',
        name: '个人中心',
    },
    {
        id: '3',
        name: '安全退出',
    },
]

module.exports = {
    logo,
    navMenu,
    userSetMenu,
    title: '小宝编程',
    copyRight: 'xiaobaoschool.com',
    iconfontUrl: '',
}

