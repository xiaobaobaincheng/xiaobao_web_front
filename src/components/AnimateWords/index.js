/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-13 20:03:33
 * @LastEditTime: 2019-12-18 10:30:51
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactWords from 'react-words';

import styles from './index.module.less';
import {
  classNames,
  lodash
} from '../../utils'


const AnimateWords = props => {
    let {
        show,
        type,
        speed,
    } = props;
    // const [ show, setShow ] = useState(true);
    return (
        <div className="">
            <ReactWords
                show={show}     // 必填 控制显示或隐藏 默认false
                type={3}    // 选择一种动画效果 默认0
                speed={300}
                >欢迎来到小宝编程</ReactWords> 
            {/* <button onClick={()=>setShow(!show)}>切换</button> */}
        </div>
    
    )
}

AnimateWords.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.number,
    speed: PropTypes.number,
}

export default AnimateWords;
