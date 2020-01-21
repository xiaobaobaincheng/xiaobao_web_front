/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-12 15:53:12
 * @LastEditTime : 2020-01-06 09:29:03
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  classNames,
  lodash
} from '../../utils';
import { withRouter, Link } from 'dva/router';
import { Layout, Menu, Dropdown, Button, Avatar, Input, Icon } from 'antd';
import wrapAuth from '../../HOC/wrapAuth';

import styles from './index.module.less';

const AuthButton = wrapAuth(Button);

const { Header} = Layout;
const { Search } = Input;

function MyHeader({
    logo,
    navMenu,
    userSetMenu,
    className,
    isActive,
    userinfo= {},
    userClick= () => {},
    editArticle = () => {}
}){
    const userMenu = (
        <Menu onClick={userClick}>
            {
                userSetMenu.map((item,index) => {
                    return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })
            }
        </Menu>
    );

    const isLogin = lodash.isEmpty(userinfo);

    return (
        <Header className={classNames(className, styles.header)}>
            <div className={`container ${styles.container}`}>
                <div className={styles.left_box}>
                    <div className={styles.logo} style={{'backgroundImage':`url(${logo})`}}></div>
                </div>
                <div className={styles.right_box}>
                    <div className={styles.tools_menu}>
                        <div className={styles.nav_menu}>
                            {
                                navMenu.map((item,index) => {
                                    return <Link className={`${styles.items} ${item.name === isActive ? styles.active : '' }`} to={item.path} key={index}>{item.name}</Link>
                                })
                            }
                        </div>
                        <Search
                            className={styles.search}
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                        ></Search>
                    </div>
                    <div className={styles.user}>
                        {/* <Link className={styles.edit} to={isLogin ? "/login" : ""}><span className={`iconfont icon-bianji ${styles.icon}`}></span> 写文章</Link> */}
                        <AuthButton className={styles.edit} type="link" isAuth = {!isLogin} onClick={() => editArticle()}>
                            <span className={`iconfont icon-bianji ${styles.icon}`}></span>写文章
                        </AuthButton>
                        {
                            isLogin ? <Link to="/login">登录 / 注册</Link> :
                            <Dropdown overlay={userMenu} placement="bottomRight">
                                <div className={styles.auth}>
                                    <div className={styles.name_text}>
                                        <span>欢迎</span>
                                        <span className={styles.name}>{userinfo.name || 'admin'}</span>
                                    </div>
                                    <Avatar className={styles.avatar} icon="user" src={userinfo.avatar}/>
                                </div>
                            </Dropdown>
                        }
                    </div>
                </div>
            </div>
        </Header>
    )
};

export default MyHeader;
