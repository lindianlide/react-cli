import React from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    id?: string
    className?: string
    onRef?: (HTMLDivElement) => void
}

function CreatePortal() {
    class Portal extends React.Component<PortalProps> {
        private readonly el: HTMLDivElement

        constructor(props) {
            super(props)
            this.el = document.createElement('div')
            const { id, className } = props
            if (id || className) {
                if (props.id) this.el.id = id
                if (props.className) this.el.className = className
                document.body.appendChild(this.el)
            }
            if (props.onRef) {
                props.onRef(this.el)
            }
        }
        componentDidMount() {
            document.body.appendChild(this.el)
        }
        componentWillUnmount() {
            document.body.removeChild(this.el)
        }
        render() {
            return createPortal(this.props.children, this.el)
        }
    }

    return Portal
}
export default CreatePortal()
