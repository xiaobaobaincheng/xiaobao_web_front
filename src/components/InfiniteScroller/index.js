/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-19 17:12:47
 * @LastEditTime : 2020-01-06 13:48:18
 */

import React, {Component} from 'react';
import { Skeleton, Spin, Icon, Empty } from 'antd';
import { Link, } from 'dva/router';
import styles from './index.module.less';
import { classNames } from '../../utils';

// 滚动加载组件
import InfiniteScroll from "react-infinite-scroll-component";

// 图片懒加载
import LazyImgComponent from '../LazyImgComponent';
// 懒加载图片
import placeholderImg from '../../assets/yay.jpg';

function ScrollList({
    className = '',
    loading = true,
    dataSource = [],
    hasMore = false,
    fetchMoreData = () => {},
    linkPath,
    refresh = () => {
        console.log('wwwwww')
    },
}){
    // 首屏骨架屏
    const renderSkeleton = (length = 6) =>{
        let template = [];
        for (let i = 0; i < length; i++){
            let html =  <div className={styles.items} key={i}>
                            <Skeleton className={styles.text} key={i} active />
                            <div className={styles.image}></div>
                        </div>
            template.push(html)
        }
        return template;
    }
    // loading样式
    const renderLoading = () => {
        return (
            <div className={styles.loading}>
                <h4 className={styles.text}>Loading...</h4>
                <Spin></Spin>
            </div>
        )
    }
    // 数据空样式
    const renderNoData = () => {
        return (
            <div className={styles.no_data}>
                <div className={styles.text}><Empty></Empty></div>
            </div>
        )
    }
    // list样式
    const renderListItem = (item, index) => {
        return (
            <div key = {index} className={styles.items}>
                <div className={styles.text}>
                    <div className={styles.content}>
                        <Link className={styles.title} to={linkPath+item.id} target="_blank">{item.title}</Link>
                        <div className={styles.text_contsnt}>{item.content}</div>
                    </div>
                    <div className={styles.actions}>
                        <span className={styles.item_icon}><Icon type="star-o"/> {item.star}</span>
                        <span className={styles.item_icon}><Icon type="like-o"/> {item.like}</span>
                        <span className={styles.item_icon}><Icon type="history" /> {item.date}</span>
                    </div>
                </div>
                <div className={styles.image}>
                    <LazyImgComponent 
                        src = {item.image}
                        placeholder = {placeholderImg}>
                    </LazyImgComponent>
                </div>
            </div>
        )
    }
    // 第一次加载数据为空、再次加载数据状态
    const renderLoader = dataSource.length == 0 && !loading ? renderNoData() : (dataSource.length == 0 ? renderSkeleton() : renderLoading());

    return (
        <div className = {`${styles.scrollpage} ${dataSource.length == 0 ? styles.overcontent : ''}`}>
            <InfiniteScroll
                className = { classNames(className, `${styles.list}`)}
                dataLength={dataSource.length}
                next={fetchMoreData}
                hasMore={hasMore}
                pullDownToRefresh={false}
                loader={renderLoader}
                endMessage = {dataSource.length == 0 ? renderNoData() : (<div className={styles.is_end}><Icon type="frown" />  我是有底线的~~</div>)}
                refreshFunction={refresh}
            >
                {dataSource.map((i, index) => renderListItem(i, index))}
            </InfiniteScroll>
        </div>
    );
}

export default ScrollList;
