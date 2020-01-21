/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-08 10:05:24
 * @LastEditTime : 2020-01-20 15:46:38
 */
import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { Button, Input, Icon, Modal } from 'antd';

import styles from './index.module.less';

function CreateForm({
    flag,
    setFlag,
    onSubmit
}) {
    const [value, setValue] = useState('');

    let textInput = null;
    const openForm = () => {
        setFlag(true);
        textInput.focus();
    };

    const onChangeInput = (e) => {
        setValue(e.target.value)
    };

    const handleSubmit = () => {
        if(!value) {
            Modal.error({
                title: '请输入内容',
            });
            return;
        }

        setFlag(false);
        onSubmit(value);
        setValue('');
    };
    
    return (
        <div className={styles.create_form}>
            <Button type="link" icon="plus" className={styles.button} onClick={openForm}>新建文集</Button>
            <div className={`${styles.form} ${flag ? styles.block : ''}`}>
                <div className={styles.input}>
                    <Input ref={(input) => {textInput = input}} onChange={onChangeInput} value={value} allowClear maxLength={10}/>
                </div>
                <div className={styles.button_group}>
                    <Button ghost size="small" type="primary" onClick={handleSubmit} >提交</Button>
                    <Button ghost size="small" type="dashed" onClick={() => setFlag(false)} >取消</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;
