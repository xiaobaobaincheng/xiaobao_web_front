/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-30 16:40:18
 * @LastEditTime : 2020-01-20 09:54:27
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import styles from './hoc.less';

const wrapLoading = ((ComposedComponent) => class WrapComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        let {loading, ...rest} = this.props;
        return !loading ? <ComposedComponent {...rest}></ComposedComponent> : <div className={styles.loading}><Spin></Spin></div>
    }
})

export default wrapLoading;