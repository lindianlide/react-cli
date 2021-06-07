import ReactDOM from 'react-dom'
import React from 'react'

import Dialog from './Dialog'
import { ModalProps } from './typings'

export default function create(props: ModalProps) {
    const _div = document.createElement('div')
    const baseConfig = {
        visible: true,
        header: false,
        footer: false,
        closable: true,
        maskClosable: true,
        hasMask: true,
        ...props
    }

    function render({ content, body, ...props }: ModalProps) {
        if (body) {
            ReactDOM.render(<Dialog {...props}>{body}</Dialog>, _div)
        } else {
            ReactDOM.render(
                <Dialog {...props}>
                    <div>{content}</div>
                </Dialog>,
                _div
            )
        }
    }

    function close() {
        const newProps = {
            ...baseConfig,
            autoCloseTime: 10
        }
        render(newProps)
    }

    function update(newProps: ModalProps) {
        newProps = {
            ...baseConfig,
            ...newProps
        }
        render(newProps)
    }

    render(baseConfig)

    return {
        close,
        update
    }
}
