/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-06 09:57:07
 * @LastEditTime : 2020-01-06 10:33:30
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag, } from 'antd';
import styles from './index.module.less';

function Tags({
    tagColor,
    tagList = [],
}) {
    const getColor = () => {
        let r = Math.floor( Math.random() * 256 );
        let g = Math.floor( Math.random() * 256 );    
        let b = Math.floor( Math.random() * 256 );
        return "rgb("+r+','+g+','+b+")";
    }
    return (
         <div className={styles.tag_list_box}>
            <p className={styles.title}>相关标签</p>
            {
                tagList.map((item, index) => {
                    return <Tag color={tagColor ? tagColor : getColor()} key={index}>{item}</Tag>
                })
            }
        </div>
    )
}

export default Tags;
