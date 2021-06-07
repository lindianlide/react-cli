import { DialogProps } from './Dialog'

export interface toastProps extends DialogProps {
    /** toast内容 */
    content?: string
    /** 延迟关闭 */
    delay?: number
}

export interface basicProps extends DialogProps {
    /** 主内容 */
    body?: JSX.Element | undefined
}

export type ModalProps = DialogProps & toastProps & basicProps

export type ModalFunc = (newProps: ModalProps) => ModalInstance

export interface ModalInstance {
    close: () => void
    update: (newProps: ModalProps) => void
}

export interface ModalStaticFunctions {
    toast: ModalFunc
    basic: ModalFunc
}
