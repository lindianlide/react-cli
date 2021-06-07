import React from 'react'
import ReactDOM from 'react-dom'
import '@/utils/artFilter.js'
import HttpApi from '@/utils/httpApi.ts'

import { smoothScrollTo } from '@/utils/utils'

import TopHead from './floors/main/TopHead'
import OverPage from './floors/main/OverPage'
import IndexPage from './floors/main/IndexPage'
import './assets/css/index.less'
import './index.less'

class App extends React.Component<Record<string, any>, Record<string, any>> {
    globalData: Record<string, any>
    navConfig: Record<string, string | boolean>
    constructor(props) {
        super(props)
        this.globalData = window || {}
        this.state = {
            isLogin: false,
            baseInfo: null,
        }
        this.navConfig = {
            pageName: this.globalData.pageName,
        }
    }

    async componentDidMount() {
        if (this.globalData.respCode !== '0') {
            await this.getBaseData()
            this.handleEvent()
        }
        $('.page-loading').hide()
        try {
            //const globalPerformance = window.performance || window.Performance
            //const performanceData = globalPerformance ? globalPerformance.timing : {}
            //todo uom
        } catch (e) {
        }
    }

    async getBaseData() {

        this.setState({
            isLogin,
            baseInfo,
        })
    }


    handleEvent() {
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible') {
                //唤醒更新
                this.getBaseData()
            }
        })
    }
    render() {
        const { baseInfo, activityInfo, isLogin } = this.state
        const { respCode } = this.globalData


        if (baseInfo) {
            //接口异常
            if (Object.keys(baseInfo).length === 0) {
                return <OverPage {...this.navConfig} />
            }
            return (
                <>
                    <TopHead {...this.navConfig} />
                    <IndexPage isLogin={isLogin} />
                </>
            )
        } else {
            return <></>
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
