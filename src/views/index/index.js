import React from 'react'
import ReactDOM from 'react-dom'
import Banner from './floors/Banner/banner'
import Api from '@/api/api'

import './assets/css/index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            floors: {}
        }
    }

    getInfo() {
        let data = {
            a: 1
        }
        Api.getInfo(data).then((res) => {
            if (res && res.floors) {
                this.setState({ floors })
            }
        })
        // 改变状态后再调函数
        // this.setState({ floors }, () => {
        //         callback && callback()
        // })
    }

    componentWillMount() {
        this.getInfo()
    }

    render() {
        const { floors } = this.state
        return (
            <main className='home-container'>
                {floors.length > 0 && <Banner floors={floors} />}
            </main>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))
