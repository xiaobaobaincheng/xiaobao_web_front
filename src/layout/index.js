/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-12 15:49:35
 * @LastEditTime : 2020-01-06 09:54:40
 */
import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';

import AnimateWords from '../components/AnimateWords';
import MyHeader from '../components/GlobalHeader';
import MyFooter from '../components/GlobalFooter';


import { logo, navMenu, userSetMenu, copyRight, title } from '../constants';

import styles from './index.module.less';

const { Content } = Layout;

function MyLayout({
    history,//获取路由
    dispatch,
    children,
    user
}){
    const { userinfo } = user;
    const heaerProps = {
        logo,
        navMenu,
        userSetMenu,
        userinfo,
        isActive: '首页',
        className: styles.header,
        userClick : (e) =>{
            console.log(e.key)
            if(e.key == 3){
                dispatch({
                    type: 'user/effect:logout',
                    payload: {}
                })
            }
        },
        editArticle: () =>{
            history.push(`/editArticle`);
        }
    }
    const footerProps = {
        title,
        copyRight,
        className: styles.footer,
    }
    
	return (
		<div className={styles.page}>
            <MyHeader {...heaerProps}></MyHeader>
			<Content className={`container ${styles.content}`}>
				{ children }
			</Content>
			<MyFooter {...footerProps}></MyFooter>
		</div>
	)
}

function mapStateToProps({ user }){
  return { user };
}
export default connect(mapStateToProps)(MyLayout);
