/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-06 09:43:27
 * @LastEditTime : 2020-01-20 17:39:52
 */
import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, Input, Modal } from 'antd';

import styles from './index.module.less';

import FirstMenu from '../../components/EditorSlider/FirstMenu';
import SecondMenu from '../../components/EditorSlider/SecondMenu';
import Editor from '../../components/Editor';

import WarpLoading from '../../HOC/wrapLoading';
const WarpLayout = WarpLoading(Layout);

function EditArticle({
    dispatch,
    admin,
}) {
    console.log(admin);
    const { 
        loading,
        collectWord, 
        articleList, 
        contLoading,
        artLoading,
        editorLoading,
        curCollectWordKey,
        curArticleKey,
        currentArt,
        currentEditor,
    } = admin;

    const [visible, setVisible] = useState(false);

    // 文集列表参数
    const firstMenuProps = {
        logo: '小宝编程',
        menus: collectWord,
        curCollectWordKey,
        createdFun: (value) => {
            console.log(value)
            dispatch({
                type: 'admin/effect:created:collectedWord',
                payload: {
                    text: value
                }
            })
        },
        handleClick: (id) => {
            dispatch({
                type: 'admin/effect:query:articleList',
                payload:{ id }
            })
        },
        handleUpdateClick: () => {
            setVisible(true)
        },
        handleDelClick: (id) => {
            dispatch({
                type: 'admin/effect:delete:collectedWord',
                payload: {id}
            })
        },
        defaultEditor: (editor) => {
            dispatch({
                type: 'admin/effect:setting:dedaultEditor',
                payload: {
                    editor: editor
                }
            })
        },
        setThemeFun: (color) => {
            console.log(color)
        }
    }

    // 文章列表参数
    const secondMenuProps = {
        loading: artLoading,
        collectWord,
        articleList,
        curArticleKey,
        curCollectWordKey,
        addClick: () => {
            dispatch({
                type: 'admin/effect:create:article',
                payload:{id: curCollectWordKey}
            })
        },
        handleClick: (id) => {
            dispatch({
                type:'admin/effect:query:articleDetails',
                payload:{id}
            })
        },
        moveClick: (toid, id) =>{
            console.log(toid, id)
            dispatch({
                type: 'admin/effect:move:article',
                payload: {toid, id, fromid: curCollectWordKey}
            })
        },
        delClick: (id) => {
            dispatch({
                type:'admin/effect:delete:article',
                payload:{
                    pid: curCollectWordKey,
                    id
                }
            })
        }
    }

    // 文章详情参数
    const editorProps = {
        loading: editorLoading,
        currentEditor,
        currentArt,
        onChangeEditor: (type,value) => {
            dispatch({
                type: 'admin/effect:update:currentArt',
                payload: {type,value}
            });
        },
        onSave: () => {
            const {id, title, text} = currentArt;
            dispatch({
                type: 'admin/effect:save:article',
                payload: {id, title, text}
            })
        }
    }

    return (
        <WarpLayout loading={loading} className={styles.container}>
            <div className={styles.slider}>
                <FirstMenu {...firstMenuProps}></FirstMenu>
            </div>
            <WarpLayout loading={contLoading}>
                <div className={styles.content_box}>
                    <SecondMenu {...secondMenuProps}></SecondMenu>
                    <Editor {...editorProps}></Editor>
                </div>
            </WarpLayout>
            <Modal
                title="修改文集"
                visible={visible}
                onOk={()=>setVisible(false)}
                onCancel={()=>setVisible(false)}
            >
                <Input value={ ''} allowClear maxLength={10}/>
            </Modal>
        </WarpLayout>
    )
}

function mapStateToProps({admin}) {
    return {admin}
}

export default connect(mapStateToProps)(EditArticle);
