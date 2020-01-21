/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-09 10:14:24
 * @LastEditTime : 2020-01-20 16:22:29
 */
import request from '../utils/request';

// 获取文集列表
export async function queryCollectedWordList(body){
    return request('/admin/collectedWordList', {
        method: 'POST',
        body
    })
}

// 创建文集
export async function cratedCollectedWord(body){
    return request('/admin/cratedCollectedWord', {
        method: 'POST',
        body
    })
}

// 删除文集
export async function delCollectedWord(body){
    return request('/admin/delCollectedWord', {
        method: 'POST',
        body
    })
}

// 更新文集
export async function updateCollectedWord(body){
    return request('/admin/updateCollectedWord', {
        method: 'POST',
        body
    })
}

// 获取文章列表
export async function queryArticleList(body){
    return request('/admin/articleList', {
        method: 'POST',
        body
    })
}

// 创建文章
export async function cratedArticle(body){
    return request('/admin/cratedArticle', {
        method: 'POST',
        body
    })
}

// 删除文章
export async function delArticle(body){
    return request('/admin/delArticle', {
        method: 'POST',
        body
    })
}

// 更新文章
export async function updateArticle(body){
    return request('/admin/updateArticle', {
        method: 'POST',
        body
    })
}

// 移除文章
export async function moveArticle(body){
    return request('/admin/moveArticle', {
        method: 'POST',
        body
    })
}

// 获取编辑器配置参数
export async function editorParams(body){
    return request('/admin/editorParams', {
        method: 'POST',
        body
    })
}

// 设置默认编辑器
export async function defaultEditor(body){
    return request('/admin/defaultEditor',{
        method: 'POST',
        body
    })
}