import React from 'react'
import Modal from '@/components/CommonComponents/Modal/index'
import './index.less'
import hosts from '@/config/hosts'

export default function DialogTwo() {
    const bodyDom = (
        <div className='bind-mobile'>
            <div>请绑定后再领取哦~</div>
        </div>
    )
    const goBind = () => {
        window.location.href = hosts.checkMobile
    }
    const footerDom = (
        <div className='bind-button'>
            <div className='cancel-btn' onClick={goBind}>
                去绑定
            </div>
        </div>
    )
    Modal.basic({
        body: bodyDom,
        footer: footerDom,
        wrapClassName: 'normal-bind-modal',
        topClose: false
    })
}
