/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-08 13:49:11
 * @LastEditTime : 2020-01-20 17:16:05
 */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Affix, Menu, Dropdown, Button, Input, Icon, Spin } from 'antd';

import styles from './index.module.less';

import WarpLoading from '../../../HOC/wrapLoading';
const WarpMemu = WarpLoading(Menu);

const { SubMenu } = Menu;
const { Search } = Input;
let container = null;

function SecondMenu({
    loading,
    collectWord= [],
    articleList= [],
    curArticleKey,
    curCollectWordKey,
    addClick= ()=>{},
    moveClick= ()=>{},
    delClick= ()=>{},
    handleClick= (id) => {}
}) {
    const handleDropdownClick = (e,type) => {
        e.domEvent.stopPropagation();

        type == 'move'? moveClick(e.key,curArticleKey): delClick(curArticleKey);
    }
    
    const itemSecondMenu = (
        <Menu>
            <SubMenu title="移动文章">
                {
                    collectWord.map((item,index) => {
                        return <Menu.Item key={item.id} disabled={item.id == curCollectWordKey ? true : false} onClick={(e) => {handleDropdownClick(e, 'move')}}>{item.text}</Menu.Item>
                    })
                }
            </SubMenu>
            <Menu.Item onClick={(e) => {handleDropdownClick(e, 'del')}}>删除文章</Menu.Item>
        </Menu>
    );

    const handleMenuClick= (e) => {
        if(e.key == curArticleKey) return;
        handleClick(e.key)
    }
    
    return (
        <div className={styles.secend_slider} ref={node => {container = node}}>
            <Affix target={() => container} offsetTop={0}>
                <div className={styles.top_tool}>
                    <Button 
                        type="link" 
                        icon="plus"
                        className={styles.add_button} 
                        onClick={()=>addClick()}
                    >新建文章</Button>
                    <Search
                        allowClear 
                        className={styles.search_button}
                        placeholder="搜索"
                        onSearch={value => console.log(value)}
                    />
                </div>
            </Affix>
            <WarpMemu
                width={360}
                mode="inline"
                loading= {loading}
                className={styles.list}
                onClick={e => handleMenuClick(e)}
                selectedKeys = {[curArticleKey+'']}
                defaultSelectedKeys={[curArticleKey+'']} 
            >
                {
                    articleList.map((item, index) =>{
                        return  <Menu.Item className={styles.items} key={item.id}>
                                    <Icon type="file-text" />
                                    <div className={styles.text_content}>
                                        <p className={styles.title}>{item.title}</p>
                                        <p className={styles.text}>{ curArticleKey == item.id && item.text}</p>
                                    </div>
                                    {
                                        curArticleKey == item.id && <Dropdown overlay={itemSecondMenu} placement="bottomRight">
                                            <Icon className={styles.icon} type="setting" />
                                        </Dropdown>
                                    }
                                </Menu.Item>
                    })
                }
            </WarpMemu>
        </div>
    )
}

export default SecondMenu;
