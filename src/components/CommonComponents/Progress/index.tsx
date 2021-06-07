/**
 * Dialog 进度条
 * @example
 * <Progress percent={40} appearTransition />
 * appearTransition:是否延时加载进度
 * prefixCls：进度条class前缀
 * style：底图样式
 * barStyle:进度样式
 */
import * as React from 'react'
import './index.less'
export interface ProgressProps {
    prefixCls?: string
    className?: string
    style?: React.CSSProperties
    barStyle?: React.CSSProperties
    percent?: number | string
    text?: string
    appearTransition?: boolean
}

export default class Progress extends React.Component<ProgressProps, any> {
    static defaultProps = {
        prefixCls: 'mem-progress',
        percent: 0,
        appearTransition: true
    }

    barRef: HTMLDivElement | null

    handlePercent = (percent) => {
        const percentShow = percent > 100 ? 100 : percent
        return percentShow
    }

    componentDidMount() {
        if (this.props.appearTransition) {
            setTimeout(() => {
                if (this.barRef) {
                    this.barRef.style.width = `${this.handlePercent(this.props.percent)}%`
                }
            }, 100)
        }
    }
    render() {
        const { className, prefixCls, percent, text = '', style = {}, barStyle = {} } = this.props
        const percentStyle = {
            width: !this.props.appearTransition ? `${this.handlePercent(percent)}%` : 0
        }

        const wrapCls = `${prefixCls}-outer ${className}`

        return (
            <div style={style} className={wrapCls}>
                <div
                    ref={(el) => (this.barRef = el)}
                    className={`${prefixCls}-bar`}
                    style={{ ...barStyle, ...percentStyle }}
                />
                <span className='percent-text'>{text}</span>
            </div>
        )
    }
}
