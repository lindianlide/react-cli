import React, { Component } from 'react'

class Notice extends Component {
    render() {
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type}`}>
                <span>{content}</span>
            </div>
        )
    }
}

export default Notice
