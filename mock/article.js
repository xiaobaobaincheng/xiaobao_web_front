/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-19 14:37:05
 * @LastEditTime : 2019-12-27 15:28:33
 */
const Mock = require('mockjs');
const qs = require('qs');
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

let database = [];
for (let i = 0; i < 40; i++) { // 可自定义生成的个数
    const template = {
        'id': Random.natural(1, 100),
        'star': Random.natural(1, 10), // 生成1到100之间自然数
        'like': Random.integer(1, 100), // 生成1到100之间的整数
        'date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
        'content': Random.cparagraph(), // 生成随机的中文段落
        'title': i+':'+Random.csentence(), // 生成一条随机的中文句子
    }
    database.push(template)
}

export default {
    /**
     * @name: 文章列表
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    [`POST /article/list`](req, res){
        const data = qs.parse(req.body);
        let { 
            currentPage = 1, 
            pageSize = 10
        } = data;

        setTimeout(()=>{
            let newdata = database;
            res.status(200).json({
                code: 0,
                message: '查询成功',
                data:{
                    data: newdata.slice((currentPage - 1) * pageSize, currentPage * pageSize),
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPage: Math.round(newdata.length/pageSize),
                    total: newdata.length,
                }
            });
        },1000)
    },
    /**
     * @name: 文章详情
     * @test: test font
     * @msg: 
     * @param {type} 
     * @return: 
     */
    ['GET /article/details/:id'](req, res){
        const id = req.param('id');
        setTimeout(() => {
            res.status(200).json({
                code: 0,
                data: {
                    id,
                    title: `文章id=${id}, 饭圈女孩”登上《新闻联播》：那一天，港毒废青做起了噩梦`,
                    views_count: Random.integer(1, 100),
                    updatedAt:  Random.date(),
                    text: '<p>[港媒：黄之锋周庭今日上午被捕，下午被起诉获准保释！]#黄之锋周庭被起诉获准保释# 今（30日）早被香港警方先后拘捕的“港独”组织“香港众志”头目黄之锋及成员周庭今天下午被起诉，案件于香港东区法院审理。港媒据控罪书显示“香港众志”主席林朗彦亦一同被控。3人各被指干犯“煽惑他人明知而参与未经批准集结”、“组织未经批准集结”及“明知而参与未经批准集结”等罪。控罪书所见，林朗彦亦在被告之列，却未在法庭上出现。控方透露林朗彦之前并未有任何担保，亦未知将会被控，前日（28日）离开了香港。</p><p>　　据港媒报道，主任裁判官钱礼将案件押后至11月8日再讯，以待控方调查，包括检视录像。黄之锋及周庭获准以1万元现金保释，并须守宵禁令。法庭亦允许两人前往外地出席早已安排的演讲、会议等。</p><p>　　被称为“乱港分子”的黄之锋出生于1996年，曾参与2014年“占中”等事件，2016年与罗冠聪等人成立“港独”组织“香港众志”，其所谓“纲领”包括支持香港“前途自决”等内容。</p><p>　　日前，香港《大公报》等媒体曾报道，有市民今年8月6日拍到黄之锋、罗冠聪等人与美国驻港澳总领事馆政治组主管会面。黄之锋7日被追问下承认曾与美国驻港领事交流，内容包括企图制裁香港的“香港人权与民主法案”，还有要美方不向香港警察出口装备等。</p><p>　　周庭出生于1996年，目前系“香港众志”成员，系该组织“前常委”、前副秘书长。在香港发生违法“占中”事件前，周庭曾加入反对派组织“学民思潮”，还曾被反对派形容为所谓“学民女神”。不过，“学民思潮”2016年解散。2018年1月，周庭在港岛区报名参加立法会议员补选，但被香港选举委员会裁定取消参选资格。（环球时报-环球网赴香港特派记者 陈青青 环球网记者乌元春 张丽媛 付国豪）</p><p><img src="http://luckyimgs.peopletech.cn//home/prod/zxb-cms/upload/image/20190830/1567156947845059351.jpg" alt="" style="margin: 0px auto; padding: 0px; border: 0px none; vertical-align: top; display: block; max-width: 640px;"/></p><p><img src="http://luckyimgs.peopletech.cn//home/prod/zxb-cms/upload/image/20190830/1567156947977054087.jpg" alt="" style="margin: 0px auto; padding: 0px; border: 0px none; vertical-align: top; display: block; max-width: 640px;"/></p><p><img src="http://luckyimgs.peopletech.cn//home/prod/zxb-cms/upload/image/20190830/1567156948027030942.jpg" alt="" style="margin: 0px auto; padding: 0px; border: 0px none; vertical-align: top; display: block; max-width: 640px;"/></p><p><img src="http://luckyimgs.peopletech.cn//home/prod/zxb-cms/upload/image/20190830/1567156948144011873.png" alt="" style="margin: 0px auto; padding: 0px; border: 0px none; vertical-align: top; display: block; max-width: 640px;"/></p><p><br/></p>',
                    source: '小宝编程',
                    type: '1',
                    user: {
                        name: 'big bug',
                        avatar: 'https://upload.jianshu.io/collections/images/1678119/react.png',
                        id: 5364,
                    },
                    tags: 'Javascript,Html5,react,CSS3'
                }
            })
        }, 1000);
    }
}