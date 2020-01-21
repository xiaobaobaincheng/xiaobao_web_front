/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-13 16:43:35
 * @LastEditTime : 2019-12-24 16:14:25
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'antd';
import { Link, } from 'dva/router';
import {
  classNames,
  loadsh
} from '../../utils';
import styles from './index.module.less';

function FixedMenu({
    className = '',
    menuList = [],
    isActive = 'HTML5',
    onChange = () => {},
}) {
    return (
        <div className={classNames(className, styles.menu_list)}>
            {
                menuList.length > 0 && menuList.map((item,index) => {
                    return <span
                                key={index}
                                onClick = {()=>onChange(item.id)}
                                className={classNames(styles.item, `${isActive === item.id ? styles.active : ''}`)}
                            >
                            {item.name}
                        </span>
                })
            }
        </div>
    )
}

export default FixedMenu;
