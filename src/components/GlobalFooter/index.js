/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-12 15:53:12
 * @LastEditTime : 2019-12-30 14:01:52
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout } from 'antd';

import styles from './index.module.less';

const { Footer,} = Layout;

function MyFooter({
    title,
    className,
    copyRight
}){
    return (
        <Footer className={classNames(className, styles.footer)}>{`©️${title} ${copyRight}`}</Footer>
    )
};

export default MyFooter;
