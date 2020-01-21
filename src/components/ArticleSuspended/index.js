/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-30 16:11:35
 * @LastEditTime : 2020-01-03 13:59:45
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Affix, Button } from 'antd';
import styles from './index.module.less';

import wrapAuth from '../../HOC/wrapAuth';

const AuthButton = wrapAuth(Button);

function ArticleSuspended({
    collectionCount= '3k',
    commentsCount= '41',
    isCollected=false,
}) {
    return (
        <Affix offsetTop={200} >
            <ul className={styles.fixed_menu}>
                <li className={styles.item}>
                    <AuthButton className={`${styles.icon}`}>
                        <span className={`iconfont icon-dianzan`}></span>
                    </AuthButton>
                    {`${collectionCount} 点攒`}
                </li>
                <li className={styles.item}>
                    <AuthButton className={`${styles.icon} ${isCollected ? styles.active: ''}`}>
                        <span className={`iconfont icon-collection`}></span>
                    </AuthButton>
                    收藏
                </li>
                <li className={styles.item}>
                    <AuthButton className={`${styles.icon}`}>
                        <span className={`iconfont icon-review`}></span>
                    </AuthButton>
                    {`${commentsCount} 评论`}
                </li>
            </ul>
        </Affix>
    )
}

export default ArticleSuspended
