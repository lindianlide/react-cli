import React, { Component } from 'react'
import { fixedNumLen } from '@/util/utils'
import './banner.less'

export default class Banner extends Component {
    constructor(props) {
        super(props)
        this.gotoLink = this.gotoLink.bind(this)
    }

    gotoLink(link) {
        window.location.href = link
    }

    render() {
        let { link } = this.props.floors
        return (
            <div className='banner-contain' >
                <span
                    className='banner-button'
                    onClick={() => this.gotoLink(link)}>
                    1111
                </span>
            </div>
        )
    }
}
