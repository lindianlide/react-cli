import OriginModal from './Dialog'
import { toastProps, basicProps, ModalStaticFunctions } from './typings'

import create from './create'
import './assets/css/toast.styl'

type ModalType = typeof OriginModal & ModalStaticFunctions

const Modal = OriginModal as ModalType

Modal.toast = (props: toastProps) => {
    const baseConfig = {
        width: 250,
        wrapClassName: 'toast-dialog',
        closable: false,
        maskClosable: false,
        hasMask: false,
        topClose: false,
        autoCloseTime: props.delay || 2000,
        visible: true,
        ...props
    }
    return create(baseConfig)
}

Modal.basic = (props: basicProps) => {
    const baseConfig = {
        wrapClassName: 'centered-modal',
        width: '12.2rem',
        closable: false,
        visible: true,
        ...props
    }
    return create(baseConfig)
}

export default Modal

// demo
// const ModalInstance = Modal.basic({
//     body: <div>我是模态框</div>,
//     afterClose: () => {
//         console.log('我关闭了')
//     }
// })
// setTimeout(() => {
//     ModalInstance.close()
//     ModalInstance.update({ body: <div>我是新的模态框</div> })
// }, 5000)
// Modal.toast({ content: '我是模态框' })
