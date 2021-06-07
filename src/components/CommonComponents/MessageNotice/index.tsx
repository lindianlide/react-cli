import React, { useEffect, useState } from 'react'
import Swiper from 'swiper/js/swiper.min.js'
import 'swiper/css/swiper.min.css'
import './index.less'

export interface MessageNoticeProps {
    noticeList: any[]
}
const MessageNotice: FC<MessageNoticeProps> = function(props: MessageNoticeProps) {
    const { noticeList } = props
    useEffect(() => {
        if (noticeList.length >= 1) {
            new Swiper('.message-notice-container', {
                direction: 'vertical',
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 2000
                },
                speed: 300,
                observer: true
            })
        }
    }, [])

    if (noticeList.length >= 1) {
        return (
            <div className='message-notice-container'>
                <div className='swiper-wrapper'>
                    {noticeList.map((item, index) => {
                        return (
                            <span className='swiper-slide notice-info' key={index}>
                                {item}
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default MessageNotice
