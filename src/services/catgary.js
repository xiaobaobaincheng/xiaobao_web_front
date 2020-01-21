/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-12 15:17:46
 * @LastEditTime : 2019-12-24 16:47:25
 */
 
import request from '../utils/request';

export async function getCatgary(body) {
    return request('/catgary/list',{
        method: 'GET',
        body
    });
}
