/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-06 10:37:42
 * @LastEditTime : 2020-01-08 15:22:53
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Comment, Avatar, Tooltip } from 'antd';

import styles from './index.module.less';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function CommentList({
    children 
}) {
    const ExampleComment = ({ children }) => (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
            avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
            }
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')} locale={locale}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        >
            {children}
        </Comment>
    );
    return (
        <div className={styles.comment_list}>
            <ExampleComment>
                <ExampleComment/>
                <ExampleComment/>
                <ExampleComment/>
                <ExampleComment/>
            </ExampleComment>,
        </div>
    )
}

export default CommentList;
