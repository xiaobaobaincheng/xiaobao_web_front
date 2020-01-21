/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-23 13:52:23
 * @LastEditTime : 2019-12-25 15:29:35
 */
const Mock = require('mockjs');
const qs = require('qs');

let data = [
    {
        id: 'all',
        name: '全部',
    },
    {
        id: 'js',
        name: 'JavaScript',
    },
    {
        id: 'h5',
        name: 'Html5',
    },
    {
        id: 'react',
        name: 'React',
    },
    {
        id: 'ng',
        name: 'AngularJS',
    },
    {
        id: 'rn',
        name: 'ReactNative',
    },
    {
        id: 'ios',
        name: 'IOS',
    },
    {
        id: 'android',
        name: '安卓',
    },
    {
        id: 'wx',
        name: '小程序',
    },
];

export default {
    /**
     * @name: 文章分类
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    [`GET /catgary/list`](req, res){
        setTimeout(() => {
            res.status(200).json({
                code: 0,
                messgae: '查询成功',
                data: data
            })
        }, 1000);
    },
}