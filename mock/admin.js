/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-09 09:57:48
 * @LastEditTime : 2020-01-20 17:21:30
 */
const Mock = require('mockjs');
const qs = require('qs');
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

// 文集base
let database = [];
for (let i = 0; i < 8; i++) { // 可自定义生成的个数
    const template = {
        'id': Random.uuid(),
        'text': Random.ctitle(4,8), // 生成一条随机的中文句子
    }
    database.push(template)
}

// 文章base
let ArtBase = [];
for(let i=0; i<database.length; i++){
    let ArtData = [];
    for (let j = 0; j < Random.natural(10, 25); j++) { // 可自定义生成的个数
        let template = {
            'id': Random.uuid(),
            'currentEditor': 'markdown',
            'title': Random.ctitle(10,30),
            'text': Random.csentence(200,1000), // 生成一条随机的中文句子
        }
        ArtData.push(template);
    }
    ArtBase.push({
        id: database[i].id,
        data: ArtData
    })
}

// 获取文章列表
function getArticleData(id = ''){
    const data = ArtBase.filter((item,index)=>{return item.id === id});
    if(data.length == 0){
        ArtBase.unshift({
            id: id,
            data: []
        })
        return []
    }else{
        return data[0].data
    }
}

// 编辑器参数
let Editor = {
    editor: 'ueditor',
    theme: 'block'
}



export default {
    /**
     * @name: 文集列表
     * @test: test font
     * @msg: 
     * @param {} 
     * @return: 
     */
    [`POST /admin/collectedWordList`](req, res){
        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '查询成功',
                data:database
            });
        },1000)
    },

    /**
     * @name: 创建文集
     * @test: test font
     * @msg: 
     * @param {text} 
     * @return: 
     */
    [`POST /admin/cratedCollectedWord`](req, res){
        const data = qs.parse(req.body);
        let { 
            text
        } = data;
        
        const template = {
            'id': Random.uuid(),
            'text': text,
        }
        database = [...[template], ...database];

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '创建成功',
                data:database
            });
        },1000)
    },

    /**
     * @name: 删除文集
     * @test: test font
     * @msg: 
     * @param {id} 
     * @return: 
     */
    [`POST /admin/delCollectedWord`](req, res){
        const data = qs.parse(req.body);
        let { 
            id
        } = data;

        database.splice(database.findIndex(item => item.id === id), 1)

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '删除成功',
                data:database,
            });
        },1000)
    },

    /**
     * @name: 更新文集
     * @test: test font
     * @msg: 
     * @param {id, text} 
     * @return: 
     */
    [`POST /admin/updateCollectedWord`](req, res){
        const data = qs.parse(req.body);
        let { 
            id,
            text
        } = data;

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '更新成功',
                data:database
            });
        },1000)
    },

    //----------------------------------------------------------------------------------------------------

    /**
     * @name: 文章列表
     * @test: test font
     * @msg: 
     * @param {} 
     * @return: 
     */
    [`POST /admin/articleList`](req, res){
        const data = qs.parse(req.body);
        let { 
            id
        } = data;
        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '查询成功',
                data:getArticleData(id)
            });
        },1000)
    },

    /**
     * @name: 创建文章
     * @test: test font
     * @msg: 
     * @param {text} 
     * @return: 
     */
    [`POST /admin/cratedArticle`](req, res){
        const data = qs.parse(req.body);
        let {
            id
        } = data;
        let defaultEditor = Editor.editor;
        const template = {
            'id': Random.uuid(),
            'currentEditor': defaultEditor,
            'title': new Date(),
            'text': '', // 生成一条随机的中文句子
        }
        
        ArtBase.map(item => {
            item.id == id ? item.data.unshift(template) : '';
        })
        
        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '创建成功',
                data: getArticleData(id)
            });
        },1000)
    },

    /**
     * @name: 删除文章
     * @test: test font
     * @msg: 
     * @param {id} 
     * @return: 
     */
    [`POST /admin/delArticle`](req, res){
        const data = qs.parse(req.body);
        let { 
            pid,
            id
        } = data;

        ArtBase.map(item => {
            if(item.id == pid){
                item.data.splice(item.data.findIndex(v => v.id === id), 1);
                return;
            }
        })

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '删除成功',
                data:getArticleData(pid)
            });
        },1000)
    },

    /**
     * @name: 更新文章
     * @test: test font
     * @msg: 
     * @param {id, text} 
     * @return: 
     */
    [`POST /admin/updateArticle`](req, res){
        const data = qs.parse(req.body);
        let { 
            id,
            text
        } = data;

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '更新成功',
                data:getArticleData(id)
            });
        },1000)
    },

    /**
     * @name: 移动文章
     * @test: test font
     * @msg: 
     * @param {id, text} 
     * @return: 
     */
    [`POST /admin/moveArticle`](req, res){
        const data = qs.parse(req.body);
        let { 
            toid,
            id,
            fromid
        } = data;
        let itemobj = {};
        ArtBase.map(item => {
            if(item.id == fromid){
                itemobj = item.data.find(v => v.id === id);
                item.data.splice(item.data.findIndex(v => v.id === id), 1)
            }
        });
        ArtBase.map(item => {
            if(item.id == toid){
                item.data.push(itemobj)
            }
        });

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '移动成功',
                data:getArticleData(fromid)
            });
        },1000)
    },

    // ------------------------------------------------------------------------
    /**
     * @name: 设置默认编辑器
     * @test: test font
     * @msg: 
     * @param {editor} 
     * @return: 
     */
    [`POST /admin/editorParams`](req, res){

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '获取成功',
                data: Editor
            });
        },1000)
    },
    /**
     * @name: 设置默认编辑器
     * @test: test font
     * @msg: 
     * @param {editor} 
     * @return: 
     */
    [`POST /admin/defaultEditor`](req, res){
        const data = qs.parse(req.body);
        let { 
            editor
        } = data;

        Editor.editor = editor;

        setTimeout(()=>{
            res.status(200).json({
                code: 0,
                message: '设置成功',
                data: { editor }
            });
        },1000)
    },
}



