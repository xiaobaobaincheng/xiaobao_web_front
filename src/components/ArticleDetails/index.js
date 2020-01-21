/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-27 15:06:21
 * @LastEditTime : 2020-01-07 09:24:59
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Affix, Button, Tag, Avatar,  } from 'antd';
import styles from './index.module.less';
import {
	classNames,
	lodash
} from '../../utils';

function ArticleDetail({
    id, 
    title, 
    text, 
    source, 
    user = {
        avatar: '',
        name: ''
    }, 
    updatedAt, 
    views_count,
}) {
    const textHtml = {__html:text};
    return (
        <div className={styles.content}>
            <div className={styles.title_wrap}>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.author_info_block}>
                <Avatar shape="square" className={styles.avatar} src={user.avatar} icon="user" />
                <div className={styles.author_info_box}>
                    <a href="" className={styles.username}>
                        { user.name }
                    </a>
                    <div className={styles.meta_box}>
                        <span>{updatedAt}</span>
                        <span>{`阅读量 ${views_count}`}</span>
                    </div>
                </div>
                <Button className={styles.follow}>关注</Button>
            </div>
            <div className={styles.article_content} dangerouslySetInnerHTML={textHtml}></div>
        </div>
    )
}


export default ArticleDetail;
