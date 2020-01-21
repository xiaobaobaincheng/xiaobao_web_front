/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-13 14:27:35
 * @LastEditTime : 2020-01-06 13:47:53
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Affix, BackTop, Icon } from 'antd';

import FixedMenu from '../../components/FixedMenu'
import InfiniteScroll from '../../components/InfiniteScroller';
import StickySilder from '../../components/StickySilder';

import styles from './index.module.less';
import {
  classNames,
  lodash
} from '../../utils';


function Home({
    match,//获取参数
    history,//获取路由
    dispatch,//获取异步方法
    article,//获取state
    catgary,
}){
    const [isActive, setIsActive] = useState(match.params.id || 'all');
    const fixedProps = {
        isActive,
        className: styles.left_box,
        menuList: catgary.data,
        onChange: (name) =>{
            setIsActive(name);
            history.push(`/home/${name}`, { id: name });
            fetchMoreData(1);
            window.scrollTo(0,0);
        }
    };
    
    const {loading, dataSource,pagination} = article;
    // 是否有更多
    const [hasMore, setHasMore] = useState(true);
    // 请求数据
    const fetchMoreData = (current) =>{
        // 没有数据
        if(pagination.totalPage === 0) return;
        setHasMore(true);
        // 异步加载数据
        dispatch({
            type: 'article/effect:list',
            payload: {
                currentPage: current || ++pagination.currentPage,
                id: isActive,
            }
        }).then(result  => {
            const {currentPage, totalPage} = result;
            // 到最后一页了
            if(currentPage > totalPage){
                setHasMore(false);
            }
        });
    }
    // 参数
    const scrollProps = {
        loading, //请求状态
        dataSource, //数据源
        hasMore, //是否还有更多数据
        linkPath:'/home/details/',
        fetchMoreData,
        className: styles.scrollPage,
    }

    useEffect(() => {
        fetchMoreData(1);
    }, [])

    return (
		<div className={styles.container}>
			<Affix offsetTop={ 2 } >
				<FixedMenu {...fixedProps}/>
			</Affix>
			<div className={styles.content}>
				<InfiniteScroll {...scrollProps}></InfiniteScroll>
			</div>
			<div className={styles.right_box}>
                <StickySilder></StickySilder>
                <BackTop className={styles.back_top}><Icon type="to-top" /></BackTop>
            </div>
		</div>
	)
}

function mapStateToProps({article,catgary}) {
    return{article,catgary}
}

export default connect(mapStateToProps)(Home);
