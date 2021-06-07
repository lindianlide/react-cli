import React from 'react'
import Modal from '@/components/CommonComponents/Modal/index'
import './index.less'
import hosts from '../../../config/hosts'
export default function DialogOne() {
    const handleCloseDialog = () => {
        riskDom.close()
    }
    const toRealNameCertification = () => {
        window.location.href = `${hosts.threeElement}${encodeURIComponent(location.href)}`
    }
    const bodyDom = (
        <div className='risk-bg' >
            <div className='waive-btn' onClick={handleCloseDialog}></div>
            <div className='to-risk-btn' onClick={toRealNameCertification}></div>
        </div>
    )
    const riskDom = Modal.basic({
        body: bodyDom,
        wrapClassName: 'risk-modal',
        topClose: false
    })
}
