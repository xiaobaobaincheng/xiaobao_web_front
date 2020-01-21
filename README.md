# xiaobao_web_front
dva+react+webpack构建小宝编程前端展示网站
## Dva+Antd+Mockjs实现一个博客预览以及文章发布系统。
####  博客首页：文章列表加载时骨架屏，分页无限加载、封面图懒加载等工功能

- 首页骨架屏使用的是antd提供的Skeleton组件，默认创建6条数据
```
// 首屏骨架屏
    const renderSkeleton = (length = 6) =>{
        let template = [];
        for (let i = 0; i < length; i++){
            let html =  <div className={styles.items} key={i}>
                            <Skeleton className={styles.text} key={i} active />
                            <div className={styles.image}></div>
                        </div>
            template.push(html)
        }
        return template;
    }
```

![骨架屏](https://user-gold-cdn.xitu.io/2020/1/21/16fc6ffb8c07621f?w=1920&h=969&f=png&s=262952)

- 列表无限加载，并没有使用antd提供的list组件（这个组件特鸡肋，改造了一版，一会更新上）。这里我是用了react-infinite-scroll-component插件，还不错。
```
// loading样式
    const renderLoading = () => {
        return (
            <div className={styles.loading}>
                <h4 className={styles.text}>Loading...</h4>
                <Spin></Spin>
            </div>
        )
    }
    // 数据空样式
    const renderNoData = () => {
        return (
            <div className={styles.no_data}>
                <div className={styles.text}><Empty></Empty></div>
            </div>
        )
    }
    // list样式
    const renderListItem = (item, index) => {
        return (
            <div key = {index} className={styles.items}>
                <div className={styles.text}>
                    <div className={styles.content}>
                        <Link className={styles.title} to={linkPath+item.id} target="_blank">{item.title}</Link>
                        <div className={styles.text_contsnt}>{item.content}</div>
                    </div>
                    <div className={styles.actions}>
                        <span className={styles.item_icon}><Icon type="star-o"/> {item.star}</span>
                        <span className={styles.item_icon}><Icon type="like-o"/> {item.like}</span>
                        <span className={styles.item_icon}><Icon type="history" /> {item.date}</span>
                    </div>
                </div>
                <div className={styles.image}>
                    <LazyImgComponent 
                        src = {item.image}
                        placeholder = {placeholderImg}>
                    </LazyImgComponent>
                </div>
            </div>
        )
    }
    // 第一次加载数据为空、再次加载数据状态
    const renderLoader = dataSource.length == 0 && !loading ? renderNoData() : (dataSource.length == 0 ? renderSkeleton() : renderLoading());

    return (
        <div className = {`${styles.scrollpage} ${dataSource.length == 0 ? styles.overcontent : ''}`}>
            <InfiniteScroll
                className = { classNames(className, `${styles.list}`)}
                dataLength={dataSource.length}
                next={fetchMoreData}
                hasMore={hasMore}
                pullDownToRefresh={false}
                loader={renderLoader}
                endMessage = {dataSource.length == 0 ? renderNoData() : (<div className={styles.is_end}><Icon type="frown" />  我是有底线的~~</div>)}
                refreshFunction={refresh}
            >
                {dataSource.map((i, index) => renderListItem(i, index))}
            </InfiniteScroll>
        </div>
    );
```

![博客首页](https://user-gold-cdn.xitu.io/2020/1/21/16fc6ff2de230eee?w=1920&h=969&f=png&s=336411)

- 下面说下图片懒加载，具体代码如下
```
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
```

![封面图懒加载](https://user-gold-cdn.xitu.io/2020/1/21/16fc700100b210fe?w=1920&h=969&f=png&s=233400)

### 详情页功能：详情页预览，评论、点赞、收藏

![详情页内容](https://user-gold-cdn.xitu.io/2020/1/21/16fc706e067bc9a1?w=1920&h=969&f=png&s=694214)

![评论](https://user-gold-cdn.xitu.io/2020/1/21/16fc707189a97331?w=1920&h=969&f=png&s=158669)

### 登录页面

![登录页](https://user-gold-cdn.xitu.io/2020/1/21/16fc7077c489264a?w=1920&h=969&f=png&s=2771761)

###  文章发布系统管理页面，实现功能：文集（增删改查），文章（增删改查，移动文章），设置编辑器（富文本、markdown）
- UI样式是根据简书的样式手撸的代码，实现的功能基本一致
- 编辑器采用两种（富文本、markdown）,富文本是百度的ueditor,markdown是一个开源的插件（react-markdown-editor-lite）

![新建文章](https://user-gold-cdn.xitu.io/2020/1/21/16fc708032738802?w=1920&h=969&f=png&s=72722)
![查看文章](https://user-gold-cdn.xitu.io/2020/1/21/16fc70810ee2fcc0?w=1920&h=969&f=png&s=235968)