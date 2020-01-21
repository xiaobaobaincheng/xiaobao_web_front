/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-16 14:36:04
 * @LastEditTime : 2020-01-08 15:24:06
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Affix, Button, Tag, Avatar, Icon } from 'antd';
import { connect } from 'dva';

import styles from './index.module.less';
import {
	classNames,
	lodash
} from '../../utils';

import ArticleDetail from '../../components/ArticleDetails';
import Tags from '../../components/Tages';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import ArticleSuspended from '../../components/ArticleSuspended';
import StickySilder from '../../components/StickySilder';

function Details({
    match,//获取参数
    dispatch,
    article
}){
    console.log(article.detailsData)
    const detailsProps = article.detailsData;
    const suspendedProps= {
        collectionCount: '3k',
        commentsCount: '41',
        isCollected:true,
    }
    const tags = 'Javascript,Html5,react,CSS3'
    const tagsProps = {
        tagList: tags != '' ? tags.split(',') : []
    }

    useEffect(() => {
        const id = match.params.id;
        dispatch({
            type:'article/effect:details',
            payload:{id}
        })
    }, []);
    
	return (
		<div className={`container ${styles.container}`}>
            <ArticleSuspended {...suspendedProps}></ArticleSuspended>
            <div className={styles.content}>
                <ArticleDetail {...detailsProps}></ArticleDetail>
                <Tags {...tagsProps}></Tags>
                <div className={styles.comment}>
                    <CommentForm></CommentForm>
                    <CommentList></CommentList>
                </div>
            </div>
            <div className={styles.right_box}>
                <StickySilder></StickySilder>
            </div>
        </div>
	)
}

function mapStateToProps({article}) {
    return{article}
}

export default connect(mapStateToProps)(Details)
