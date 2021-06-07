import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Modal from '@/components/CommonComponents/Modal/index'
import { ResponseData } from '@/typing'
import jsonpHttp from 'jsonp'
// import { ResponseData } from '@/typing'

interface MemAxiosConfig extends AxiosRequestConfig {
    needAuth?: boolean
    needToast?: boolean
    needDealRes?: boolean
    needUom?: boolean
    base?: string
}
interface JsonpConfig {
    base: string
    jsonpCallback: string
    params?: Record<string, string | number | boolean> | string
    jsonp?: string
    needToast?: boolean
    needDealRes?: boolean
    timeout?: number
}

interface MemAxiosInstance<T = any> extends AxiosInstance {
    (config: MemAxiosConfig): ResponseData<T>
}

interface MemAxiosError extends AxiosError {
    config: MemAxiosConfig
}

const baseURL = window && window.baseApi ? window.baseApi : ''
const passportConfig = window && window.passport_config
const passportUrl = window && window.frontPassportUrl

// 创建axios实例
export const httpService = axios.create({
    timeout: 15000,
    baseURL,
    method: 'get'
}) as MemAxiosInstance

/**
 * 请求拦截器
 */
httpService.interceptors.request.use((config: MemAxiosConfig): Promise<MemAxiosConfig> | MemAxiosConfig => {
    const { needAuth = false, base = '', url = '' } = config
    if (base) config.url = `${base}${url}`
    return needAuth ? probeAuthHandler(config) : config
})

/**
 * 响应拦截器
 */
httpService.interceptors.response.use(successHandler, errorHandler)

/**
 * 成功响应的处理函数
 * @param response 成功响应体
 */
function successHandler(response: AxiosResponse<any>): Promise<any> | any {
    // console.log('response', response)
    const { needDealRes = false } = response?.config as MemAxiosConfig

    if (!needDealRes) {
        // 不需要处理,直接返回结果
        return response.data
    } else {
        return dealSucessResData(response)
    }
}

/**
 * 额外处理成功返回结果
 * @param response 响应体
 */
function dealSucessResData(response: AxiosResponse<ResponseData>): Promise<ResponseData> {
    const { needToast = false, url = '' } = response?.config as MemAxiosConfig
    const { succesFlag = false, respCode = '', code = '', resCode = '', data = null, msg = '' } = response.data
    return new Promise((resolve, reject) => {
        if ((succesFlag && respCode === '1') || (code === '1' && data) || resCode === '01') {
            resolve(response.data)
        } else if (code === '403') {
            reject(response.data)
        } else {
            if (needToast) Modal.toast({ content: msg || resMsg })
            reject(response.data)
        }
    })
}

/**
 * 失败的处理函数
 * @param error 错误对象
 */
function errorHandler(error: MemAxiosError): Promise<MemAxiosError> {
    // console.log('error', error)
    const {
        message,
        code = '',
        response: { status = '', statusText = '' } = {},
        config: { needUom = false, needToast = false, url = '' } = {}
    } = error || {}

    return Promise.reject(error)
}

/**
 * 校验登录
 * @param config 请求参数
 */
function probeAuthHandler(config: MemAxiosConfig): Promise<MemAxiosConfig> {
    return new Promise((resolve) => {
        resolve('')

    })
}

/**
 * jsonp 请求
 * @param jsonpConfig jsonp配置项
 * @return Promise<any>
 */
export function jsonpService({
    base = '',
    needToast = false,
    params = {},
    jsonp = 'callback',
    jsonpCallback,
    needDealRes = false,
    timeout = 5000
}: JsonpConfig): Promise<any> {
    let urlParam = ''
    // url上组参数
    try {
        if (typeof params === 'object') {
            urlParam = Object.keys(params).reduce((prev, next) => {
                const encodeVal = encodeURIComponent(params[next])
                return prev ? `${prev}&${next}=${encodeVal}` : `${next}=${encodeVal}`
            }, '')
        } else {
            urlParam = params
        }
    } catch (error) {
        urlParam = JSON.stringify(params)
    }
    const url = base + (urlParam ? (base.indexOf('?') > -1 ? '&' : '?') + urlParam : '')
    return new Promise((resolve) => {
        jsonpHttp(url, { param: jsonp, timeout, name: jsonpCallback }, (res, data) => {
            const response = ({ config: { needToast }, data } as any) as AxiosResponse
            needDealRes ? resolve(dealSucessResData(response)) : resolve(data)
        })
    })
}
