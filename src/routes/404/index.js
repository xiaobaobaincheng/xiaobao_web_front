/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-16 14:45:12
 * @LastEditTime : 2019-12-20 11:19:14
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';

function NotFound(
    props
){
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}

export default NotFound;
