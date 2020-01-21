/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-16 14:41:45
 * @LastEditTime : 2019-12-24 15:42:41
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Redirect } from 'dva/router';
import { Form, Icon, Input, Button } from 'antd';
import ReactCanvasNest from 'react-canvas-nest';

import styles from './index.module.less';

import {
	classNames,
	lodash
} from '../../utils';


function Login(props){
    const {
        dispatch
    } = props;
    console.log(props)
    // 粒子背景配置参数
    const config = {
        count       : 100,                // count of points
        dist        : 6000,              // maximum length of line segments between two points
        pointOpacity: 10,                 // transparency of points
        lineColor   : '255, 255, 255',
        lineWidth   : 2,                 // multiple of line width
        pointColor  : '255, 255, 255',
        pointR      : 2,                 // radius of the point
        follow      : true,
        mouseDist   : 20000,
    }

	const { getFieldDecorator } = props.form;

	const handleSubmit = (e) => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
                dispatch({
                    type: 'user/effect:login',
                    playload: values
                })
			}
		});
	}

	return (
        props.user.token === '' ? 
		<div className={styles.container}>
		    <ReactCanvasNest className={styles.canvasNest} config = {config}/>
			<div className={styles.content}>
				<Form onSubmit={handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('username', {
						    rules: [{ required: true, message: 'Please input your username!' }],
						})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
						/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
						    rules: [{ required: true, message: 'Please input your Password!' }],
						})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
						/>,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={styles.login_button}>
						    登录
						</Button>
					</Form.Item>
					</Form>
			</div>
		</div> : <Redirect to="/"></Redirect>
	)
}

Login.propTypes = {

}

function mapStateToProps({user}) {
    return { user }
}

export default connect(mapStateToProps)(Form.create()(Login));
