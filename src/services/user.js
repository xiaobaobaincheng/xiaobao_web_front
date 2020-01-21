/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-17 15:58:49
 * @LastEditTime : 2019-12-23 16:53:57
 */

import request from '../utils/request';

export async function login(body){
    return request('/user/login', {
        method: 'POST',
        body
    })
}

export async function logout(body) {
    return request('/user/logout',{
        method: 'GET',
        body
    });
}