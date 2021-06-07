/**
 * Dialog 模态框组件
 * @example
 * new Dialog(config)
 */

import React, { useEffect, useState, FC, useRef } from 'react'
import CreatePortal from './CreatePortal'

import './assets/css/index.styl'

let uuid = 0

export interface DialogProps {
    /** 关闭模态框的回调 */
    afterClose?: () => void
    /** 底部内容 */
    footer?: React.ReactNode | boolean
    /** 头部内容 */
    header?: React.ReactNode | boolean
    /** 取消按钮的文字 默认取消 */
    cancelText?: string | undefined
    /** 模态框位置 默认centered  centered居中 bottom底部*/
    position?: string
    /** 是否显示右上角关闭按钮 默认true*/
    closable?: boolean
    /** 底部显示关闭按钮 默认false*/
    bottomClose?: boolean
    /** 顶部显示关闭按钮 默认false*/
    topClose?: boolean
    /** 关闭时销毁Modal里的子元素 默认false */
    destroyOnClose?: boolean
    /** 底部提示内容 */
    bottomTip?: React.ReactNode | string
    /** 是否展示遮罩 默认true */
    hasMask?: boolean
    /** 点击蒙层是否允许关闭 默认true */
    maskClosable?: boolean
    /** 确认按钮文字 */
    okText?: string | undefined
    /** 对话框是否可见 */
    visible?: boolean
    /** 宽度 */
    width?: number | string
    /** modal最外层的类名 */
    wrapClassName?: string
    /** 设置 Modal 的 z-index 默认1000 */
    zIndex?: number
    /** 点击遮罩层或者取消按钮的回调 */
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void
    /** 点击确定按钮的回调 */
    onOk?: (e: React.MouseEvent<HTMLElement>) => void
    /** 动效class类名 */
    animate?: string
    /** 触发关闭按钮（指关闭图标），是否触发关闭回调，默认不触发 */
    triggerCloseCb?: boolean
    /** 区块埋点 */
    sapModid?: string
    /** 坑位埋点 */
    saData?: string
    /** 点击确定是否需要loading */
    confirmLoading?: boolean
    /** 自动关闭模态框的时间  */
    autoCloseTime?: number
}

const Dialog: FC<DialogProps> = (props) => {
    const labelledby: string = 'dialogTitle' + uuid++
    const scrollTopRef = useRef(0)
    const modalRef = useRef<HTMLDivElement>(null)

    const { autoCloseTime } = props
    if (autoCloseTime) {
        setTimeout(() => {
            closeDialog()
        }, autoCloseTime)
    }

    /**
     * [关闭模态框]
     */
    const closeDialog = () => {
        const { afterClose } = props
        if (modalRef.current) {
            modalRef.current.remove()
        }

        // 关闭模态框，打开滚动
        openTouch()
        if (afterClose && typeof afterClose === 'function') {
            afterClose()
        }
    }

    /**
     * [点击确定按钮]
     */
    const confirmFn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { onOk } = props
        if (typeof onOk === 'function') {
            onOk(e)
        }
        closeDialog()
    }

    /**
     * [点击取消按钮]
     */
    const cancelFn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { onCancel } = props
        if (typeof onCancel === 'function') {
            onCancel(e)
        }
        closeDialog()
    }

    /**
     * [获取当前scrollTop]
     */
    const getScrollTop = (): number => {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
            scrollTop = document.body.scrollTop
        }
        return scrollTop
    }

    /**
     * [关闭背景滚动]
     */
    const closeTouch = () => {
        const scrollTop = getScrollTop()
        scrollTopRef.current = scrollTop
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        setTimeout(() => {
            document.body.style.top = `-${scrollTopRef.current}px`
        }, 10)
    }
    /**
     * [打开背景滚动]
     */
    const openTouch = () => {
        // 关闭滚动
        // 判断是否还存在模态框，并且不为hidden
        const maskDoms = document.getElementsByClassName('modal-mask')
        let isOpenTouch = true
        if (maskDoms && maskDoms.length > 0) {
            // 存在的模态框中只要有一个不为hidden，返回false
            isOpenTouch = Array.prototype.slice.call(maskDoms).every((item) => item.className.indexOf('hidden') > -1)
        }

        if (isOpenTouch) {
            document.body.style.overflow = 'auto'
            document.body.style.position = 'static'
            window.scrollTo(0, scrollTopRef.current)
        }
    }

    const {
        children,
        wrapClassName,
        zIndex,
        width,
        sapModid,
        saData,
        hasMask,
        topClose,
        header,
        footer,
        bottomClose,
        cancelText,
        okText,
        position,
        animate,
        visible
    } = props

    useEffect(() => {
        // 禁止滚动穿透
        visible && closeTouch()
        !visible && openTouch()
    }, [visible])

    const maskDom = hasMask ? <div className='modal-mask' style={{ zIndex: zIndex }} /> : null
    const topCloseBtn = topClose ? <span className='modal-top-close-btn' onClick={closeDialog}></span> : null
    const headerDom = !header ? null : typeof header === 'boolean' ? <div className='modal-header' /> : header
    const footerDom = !footer ? null : typeof footer === 'boolean' ? (
        <div className='modal-footer'>
            <div>
                <span className='cancel-btn' onClick={cancelFn}>
                    {cancelText}
                </span>
                <span className='confirm-btn' onClick={confirmFn}>
                    {okText}
                </span>
            </div>
        </div>
    ) : (
        footer
    )
    const bottomCloseBtn = bottomClose ? <span className='modal-bottom-close-btn' onClick={closeDialog}></span> : null

    return (
        <CreatePortal onRef={(ref) => (modalRef.current = ref)}>
            <div style={{ display: visible ? 'block' : 'none' }}>
                {maskDom}
                <div
                    role='dailog'
                    aria-labelledby={labelledby}
                    className={`modal-wrap ${wrapClassName}`}
                    sap-modid={sapModid}
                    style={{ zIndex: zIndex }}>
                    <div
                        className={`modal ${position} ${animate}`}
                        style={{ width: typeof width === 'string' ? width : width + 'px' }}>
                        <div className='modal-content'>
                            {topCloseBtn}
                            {headerDom}
                            <div className='modal-body'>{children}</div>
                            {footerDom}
                            {bottomCloseBtn}
                        </div>
                    </div>
                </div>
            </div>
        </CreatePortal>
    )
}

Dialog.defaultProps = {
    cancelText: '取消',
    position: 'centered',
    closable: true,
    bottomClose: false,
    topClose: true,
    destroyOnClose: false,
    footer: '',
    header: '',
    bottomTip: '',
    hasMask: true,
    maskClosable: true,
    okText: '确定',
    width: '15rem',
    wrapClassName: '',
    zIndex: 1000,
    animate: '',
    triggerCloseCb: false,
    sapModid: '',
    saData: '',
    visible: false
}

export default Dialog
