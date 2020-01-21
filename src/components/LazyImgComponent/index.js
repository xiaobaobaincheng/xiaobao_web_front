/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-20 13:48:13
 * @LastEditTime : 2019-12-20 13:55:28
 */

import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 动画库
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

function LazyImgComponent ({
    src, // 图片地址
    threshold = 0, // 加载触发距离
    placeholder // 懒加载图片
}){
    return(
        <Lazyimg 
            threshold = {threshold}
            placeholder = {placeholder}
            js_effect = {'transition.fadeIn'}
            src={src}>
        </Lazyimg>
    )
}

export default LazyImgComponent;