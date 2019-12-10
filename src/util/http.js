import axios from 'axios'
import Toast from '@/components/Toast/toast'

const http = axios.create({
    baseURL: '',
    timeout: 6000
})

http.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        // 请求错误 todo
        Toast.info('网络异常，稍后再试吧~')
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data
        }
    },
    () => {
        // 系统错误，500 404
        Toast.info('网络异常，稍后再试吧~')
        return Promise.reject()
    }
)

export default http
