/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-30 16:40:18
 * @LastEditTime : 2020-01-03 16:05:07
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Modal, } from 'antd';

const wrapAuth = ((ComposedComponent, path) => class WrapComponent extends Component{
    constructor(props){
        super(props);
    }

    tipError = () => {
        Modal.confirm({
            centered:true,
            content: '请先登录',
            okText: '确认',
            cancelText: '取消',
        });
    }

    render() {
        let {isAuth, onClick, ...rest} = this.props;
        const comProps = {
            onClick: isAuth ? onClick : ()=>this.tipError(),
            ...rest
        }
        return <ComposedComponent {...comProps}></ComposedComponent>
    }
})

export default wrapAuth