/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-07 10:25:39
 * @LastEditTime : 2020-01-20 15:15:55
 */
import React, {Fragment, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Input, Button } from 'antd';

import styles from './index.module.less';
import {classNames} from '../../utils';

import MarkdownEditor from './markdown';
import Ueditor from './ueditor';

import WarpLoading from '../../HOC/wrapLoading';
const WarpDiv = WarpLoading(Fragment);

function Editor({
    loading,
    className,
    currentEditor='markdown',
    currentArt= {},
    onSave= () => {},
    onChangeEditor = ()=>{},
}) {
    console.log(currentEditor)
    const {title, text} = currentArt;

    const titleProps = {
        maxLength: 50,
        value: title,	
        placeholder: "请输入标题...",
        onChange: (e)=> {
            setIsSave(true);
            onChangeEditor('title',e.target.value);
        }
    };

    const markdownProps = {
        value: text, //输出文本
        addImg: ($file) => { // 添加图片时回调
            console.log($file)
            return '<img src="..">'
        },
        onChange: text => { // 内容改变时回调
            setIsSave(true);
            onChangeEditor('editor', text)
        },
        onSave: text => { // 保存时回调
            // console.log(text);
            onSave()
        },
    };
    
    // 自动保存函数
    const [isSave, setIsSave] = useState(false);
    const timerRef = useRef();
    useEffect(()=>{
        timerRef.current = setInterval(() => {
            if(isSave){
                // console.log('已保存')
                setIsSave(false);
                onSave();
            }
        }, 5000);
        return () => {
            timerRef.current && clearInterval(timerRef.current);
        }
    }, [isSave]);
    
    return ( 
        <WarpDiv loading={loading}>
        {
            !_.isEmpty(currentArt) ? 
            <div className={styles.editor_content}>
                <div className={styles.title}>
                    <Input {...titleProps}/>
                    <div className={styles.operate}>
                        <span className={styles.save_status}>{!isSave ? '已保存' : '编辑中'}</span>
                        <Button icon="check">发布文章</Button>
                    </div>
                </div>
                <div className={styles.editor_box}>
                    {
                        currentEditor == 'ueditor' ? 
                         <div className="">
                            <Ueditor></Ueditor>
                        </div>:
                        <MarkdownEditor 
                            {...markdownProps}
                            className={classNames(className)}>
                        </MarkdownEditor>
                    }
                </div>
            </div>:
            <div className={styles.empty}>快去新建一篇文章吧</div>
        }
        </WarpDiv>
    )
};

export default Editor;
