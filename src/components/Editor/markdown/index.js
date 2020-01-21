/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-01-14 16:01:07
 * @LastEditTime : 2020-01-15 13:49:12
 */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

function EditorMarkdown({
    style,
    value= '',
    addImg= () =>{},
    onChange= () =>{},
    onSave = () => {}
}) {

    useEffect(()=>{
        document.addEventListener('paste', function (event) { 
            console.log(event) 
        })
    });

    let mdParser =  new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) { // 代码高亮
            try {
                return hljs.highlightAuto(str).value
            } catch (__) {} 
        }
    });
    
    // 实时编辑
    const handleEditorChange = ({html, text}) => {   
        onChange(text); 
    }
    // 上传图片
    const handleImageUpload = (file, callback) =>{
        const reader = new FileReader()
        reader.onload = () => {      
        const convertBase64UrlToBlob = (urlData) => {  
            let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], {type:mime})
        }
        const blob = convertBase64UrlToBlob(reader.result)
            setTimeout(() => {
                // setTimeout 模拟异步上传图片
                // 当异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
                const uploadedUrl = 'https://avatars0.githubusercontent.com/u/21263805?s=40&v=4'
                callback(uploadedUrl)
            }, 1000)
        }
        reader.readAsDataURL(file)
    }

    return (
        <MdEditor
            // ref={node => mdEditor = node}
            value={value}
            config={{
                view: {
                    menu: true,
                    md: true,
                    html: true,
                    fullScreen: true
                },
                imageUrl: 'https://octodex.github.com/images/minion.png'
            }}
            onImageUpload={handleImageUpload}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange} 
        />
    )
}

export default EditorMarkdown;
