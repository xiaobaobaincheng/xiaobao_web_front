/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-06 10:43:52
 * @LastEditTime : 2020-01-06 13:43:20
 */
import React, {useState} from 'react'
import PropTypes from 'prop-types'

import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

function EditorForm({}) {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const onChange = e => {
        setValue(e.target.value)
    }

    const onSubmit = () => {
        if (!value) {
            return;
        }
        console.log(value)
    };
    return (
        <div>
            <h4>发表评论</h4>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    发表
                </Button>
            </Form.Item>
        </div>
    )
}

export default EditorForm
