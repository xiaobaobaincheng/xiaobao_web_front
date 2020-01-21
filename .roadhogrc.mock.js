/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-12 15:17:46
 * @LastEditTime: 2019-12-17 16:33:36
 */

const fs=require('fs');
const path=require('path');
const mockPath=path.join(__dirname+'/mock');

const mock={};
fs.readdirSync(mockPath).forEach(file=>{
    Object.assign(mock,require('./mock/'+file));
});

module.exports=mock;
