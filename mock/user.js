/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-17 15:40:32
 * @LastEditTime : 2019-12-25 16:06:01
 */
const Mock = require('mockjs');
const qs = require('qs');

export default {
    /**
     * @name: 登录接口
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    [`POST /user/login`](req, res){
        const data = qs.parse(req.body);
        console.log(data)
        setTimeout(() => {
            res.status(200).json({
                code: 0,
                message: "登录成功",
                data: {
                    token: "sdfasdhfasdhfsdhf",
                    userinfo: {
                        name: "big bug",
                        count: 12,
                        avatar: "https://mirror-gold-cdn.xitu.io/16b20352d200ee99993?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                    }
                }
            })
        }, 500);
    },

    /**
     * @name: 注销登录接口
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    [`GET /user/logout`](req, res){
        const data = qs.parse(req.body);
        setTimeout(() => {
            res.status(200).json({
                code: 0,
                message: "注销成功",
            })
        }, 500);
    },

    /**
     * @name: 查询用户信息接口
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    [`GET /user/:id`](req, res) {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                message: "查询成功",
                data: {
                    name: "big bug",
                    avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1088034162,3092347871&fm=15&gp=0.jpg"
                }
            })
        }, 500);
    }
}