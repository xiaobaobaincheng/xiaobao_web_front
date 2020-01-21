/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-16 15:30:50
 * @LastEditTime : 2019-12-30 14:29:24
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Card, Calendar, Affix } from 'antd';

import styles from './index.module.less';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Meta } = Card;

const meImage = require('../../assets/images/me.jpg');

function StickySilder({

}){

    return (
        <div className={styles.sticky}>
            <div className={styles.carousel}>
                <Carousel autoplay>
                    <div className={styles.banner_item}>
                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                    <div className={styles.banner_item}>
                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                </Carousel>
            </div>

            <div className={styles.calendar}>
                <Calendar fullscreen={false} locale={locale}/>
            </div>

            <div className={styles.cart_list}>
                <Card title="热门文章" extra={<a href="#">更多</a>} style={{ width: "100%" }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
            
            <Affix offsetTop={5}>
                <div className={styles.qr_code}>
                    <Card
                        hoverable
                        style={{ width: '100%' }}
                        cover={<img alt="example" src={meImage} />}
                    >
                        <Meta title="扫码加好友" />
                    </Card>
                </div>
            </Affix>
        </div>
    )
}

export default StickySilder
