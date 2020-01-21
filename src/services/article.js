/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-19 14:43:15
 * @LastEditTime : 2019-12-25 15:17:58
 */
import request from '../utils/request';

export async function getList(body){
    return request(`/article/list`,{
        method: 'POST',
        body
    })
}

export async function getDetails(body){
    const { id } = body;
    return request(`/article/details/${id}`,{
        method: 'GET',
    })
}