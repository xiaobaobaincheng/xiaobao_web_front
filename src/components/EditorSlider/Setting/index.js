/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-08 16:42:42
 * @LastEditTime : 2020-01-19 10:44:30
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon } from 'antd';

import styles from './index.module.less';

const { SubMenu } = Menu;

function Setting({
    defaultEditor,
}) {

    const bottomMenu = (
        <Menu>
            <SubMenu title="默认编辑器">
                <Menu.Item onClick={()=>defaultEditor('markdown')}>MarkDown编辑器</Menu.Item>
                <Menu.Item onClick={()=>defaultEditor('ueditor')}>富文本编辑器</Menu.Item>
            </SubMenu>
            <Menu.Item>帮助？</Menu.Item>
        </Menu>
    );
    
    return (
        <div className={styles.sider_bottom}>
            <Dropdown overlay={bottomMenu} placement="topLeft">
                <Button type="link" icon="menu">设置</Button>
            </Dropdown>
        </div>
    )
}

export default Setting;
