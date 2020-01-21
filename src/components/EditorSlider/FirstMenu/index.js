/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-08 13:44:22
 * @LastEditTime : 2020-01-20 17:24:49
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu, Dropdown, Modal, Button, Icon } from 'antd';

import styles from './index.module.less';

import CreateForm from '../CreateForm';
import Seting from '../Setting';

const { Sider } = Layout;

function FirstMenu({
    logo = '小宝编程',
    menus = [],
    curCollectWordKey,
    createdFun= () => {},
    handleClick= () => {},
    handleUpdateClick= () => {},
    handleDelClick= () => {},
    defaultEditor = () => {},
}) {
    const [flag, setFlag] = useState(false);
    const [selectKey, setSelectKey] = useState(0)
    
    const formProps = {
        flag,
        setFlag,
        onSubmit: (value) =>{
            setSelectKey(0);
            createdFun(value);
        }
    }

    const setProps = {
        defaultEditor,
    }

    const handleMenuClick = (e) =>{
        if(e.key == curCollectWordKey) return;
        setSelectKey(e.key);
        handleClick(e.key);
    }

    const delClick = (e) => {
        e.domEvent.stopPropagation();
        handleDelClick(selectKey);
    }
    const itemFirstMenu = (
        <Menu>
            <Menu.Item key="0" onClick={handleUpdateClick}>
                <Icon type="form" />修改
            </Menu.Item>
            <Menu.Item key="1" onClick={delClick}>
                <Icon type="rest" />删除
            </Menu.Item>
        </Menu>
    );
    
    return (
        <Sider className={styles.first_slider}>
            <div className={styles.logo}>{logo}</div>
            <CreateForm {...formProps}></CreateForm>
            <div className={`${styles.menu} ${flag ? styles.maxTop : ''}` }>
                <Menu 
                    theme="dark"
                    mode="inline"
                    className={styles.list}
                    onClick={handleMenuClick} 
                    selectedKeys = {[curCollectWordKey+'']}
                    defaultSelectedKeys={[curCollectWordKey+'']} 
                >
                    {
                        menus.map((item, index) => {
                            return  <Menu.Item className={styles.item} key={item.id}>
                                        <div className={styles.text}>
                                            <span>{item.text}</span>
                                        </div>
                                        {
                                            curCollectWordKey == item.id && <Dropdown overlay={itemFirstMenu} placement="bottomRight">
                                                <Icon type="setting" />
                                            </Dropdown>
                                        }
                                    </Menu.Item>
                        })
                    }
                </Menu>
            </div>
            <Seting {...setProps}></Seting>
        </Sider>
    )
}

export default FirstMenu;
