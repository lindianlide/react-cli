
import host from '../config/hosts'
import { HmsObject, timestamp } from '@/typing'

let clickFag = true
export function avoidClick(cb, ...args) {
    if (clickFag) {
        clickFag = false
        typeof cb === 'function' && cb(...args)
        setTimeout(() => {
            clickFag = true
        }, 1000)
    }
}

/**
 * 图片链接转换
 * @param data  所传引入图片路径
 * @returns {*}
 */
export function dealImgUrl(data: string): string {
    if (data) {
        if (data.indexOf('data:') === 0 && data.indexOf(';base64,')) {
            return data
        }
        const reg = /\.\.\/images\//
        const dataUrl = host.imageDomain + data.replace(reg, '')
        return dataUrl
    }
    const defaultDataUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAQAAABJXchjAAAEGElEQVRo3u2azW7TTBSG5waqXgNcUyVY0kto0m+L2LLsNSB1gUpXsC/5pekCJARigVoptKoKUuX585AmzcOijuvY4z/SNP0kfDaR4jPzaDzn9TszFqFIhxVGaGHEWFhhUqHjMMIIvWY27Uv70m7qtey/ybBiHLVqRbZHsQDEE3WqkEgU6tQ8WQGE3lLMh966b4hGGkGh0I37hNj2ISgUevu+IJp5CAqFbi4dwgjVKEJQKFTD3B3EJANhPdPROxpb2cxJfQjzWD8PX+k3ei8Ru/ptFQSFQr/Vu3O5b8JX+rl5XANCb2unbur/zkKi0E5vV4JwwjQVywvTdFkInQrzaJkICoV5lO5TjFJhX8ilIkjsi3SfYjoXCPc6WCpEgHtNqtesHO0v+3Ho/XSfWYi9pUPs/YP4B/E/hdhdOsRuOcS7pUO880LM2deJJw3HiLBWVyEjHNr33yRtiechvJbFYDjjhAtCf6Me6JALTjjDYHJsTx5Ew4+g+UqHFj2GFUcjZEiPFh2+ovMwGj6IHAftOKHFIUf06POrAkbIL/r0OOKQFie4QmeegFDN/Ca/0GHAgAFdhvwuhfjNkG6U0eFLEXYzhii2ryHfaTFgQJ8ePxNNSiSSgCD6dZvxkx59Bgxo8b1w7G4ssTDCbBT6ICSfaNGmxXE8tJIAhcUxYoTDoghiEMdxlPEJmTMn4vY3jBBmXavi4bUojvnGKTZqUKJwXJO8rnHMzLHBcso3jqPswkpSZl24zaDUkBkcYVz1ASYCmCYCYIImiJUlxGFKPXuA2xThjqxY+7dIaYBbkGmMoSpqiiTcqQwxS9FRZ9McjGvqrVgk4Y5wz4JaKaMChBuMEUE94/tM6NKJOT87ppRd04oPYjYx9XppiSYRLgkBMJxz4YnzaL5YLqsvhTYqiNWtLmgMY8DwgQPanjjgAwa4wszpRhWxKpTt2XQcxbqgaEd6mI4+bVSsGyN0GUaz4gtMIbHRTJhNvR+8p8/RHMARfd7zI3EXTLEFGJkXWP6rPMCmdAHgnC7dBMYRXbqce+60ObXif5V7TY1EcZ0pSoBLDmnHEG0OufSIWJ5u5Jsaj72TuFx1DPnIAR06HPCRMPc+l4bw27t8oyu5yhUnmDDkM58ZMim46yoFkWN0iyz/pFCkkxKVj1rf8u9Vh5jOVU1liLorMMm4pJOygHH6cdSHcAtDuMUhfCVaByFbon+xIJYZsaqDgEcz/2pVPtNMagP49bIKxL5PujVXKWNbdl1zlbB6JRtn1bYQb9YVlhBXIUJsnFNpC7HOZurNUqdKyHqbqQ9iW/lBbLA/yKOGB3PosvDxU+NOjp8WOohrmpUfSW6v/nD2v9UfUzdXf2DfWMGnC/apOovfEGf26Uq+n7BCr9n4Iw67wEccfwCXoxG3xYrMYgAAAABJRU5ErkJggg=='
    return defaultDataUrl
}

/**
 * 图片服务器图片增加压缩参数
 * @param {*} url 图片链接
 * @param {*} type 类型  1.推荐图片 2.普通配图
 * @returns {*}
 */
export function replaceUimgParam(url: string, type: number): string {
    if (/\w(\.gif|\.apng)/i.test(url)) return url
    if (url && url.indexOf('format=') === -1 && url.indexOf('base64,') === -1) {
        const sign = url.indexOf('?') > -1 ? '&' : '?'
        url += sign + (type === 1 ? 'format=_is_300w_300h_4e_1pr' : 'format=is_3le_1pr')
        if ($.isWebp) {
            url += '.webp'
        }
    }
    return url
}

/**
 * 预加载图片
 * @param url String
 */
export function preLoadImg(url: string): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 3000)
        const img = new Image()
        img.onload = function () {
            resolve(true)
        }
        img.onerror = function () {
            reject(url)
        }
        img.src = url
    })
}
/**
 * 预加载图片
 * @param urls String[]
 */
export function preLoadImgList(urls: string[]): Promise<(string | boolean)[]> {
    const promiseList: Promise<boolean | string>[] = []
    urls.forEach((url) => {
        url && promiseList.push(preLoadImg(url))
    })
    return Promise.all(promiseList)
}


/**
 * 动态加载微信js,并执行回调
 * @returns {*}
 */
export function loadWxSdk(cb: any): void {
    if (window && window.wx && window.wx.miniProgram) {
        cb && typeof cb === 'function' && cb()
    } else {
        const wechatJsSdk = `//res.wx.qq.com/open/js/jweixin-1.6.0.js`
        $.loadMod(wechatJsSdk).done(cb)
    }
}

/**
 * 跳转小程序url
 * @returns {*}
 */
export function goWxUrl(url: string): () => void {
    const fun: () => void = () => {
        window.wx &&
            window.wx.miniProgram &&
            window.wx.miniProgram.navigateTo({
                url: url
            })
    }
    return fun
}

/**
 * 滚动至指定位置
 * @param {number} y
 * @param {number} time
 * @returns
 */

export function smoothScrollTo(y = 0, time = 300): void {
    let currentPosition: number = getScrollTop()
    const interval = Math.floor((((y - currentPosition) / time) * 1000) / 60) // 每帧滑动的距离
    const scrollOnce = () => {
        if (
            interval !== 0 &&
            ((currentPosition < y && currentPosition + interval <= y) ||
                (currentPosition > y && currentPosition + interval >= y))
        ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            $('html,body').scrollTop((currentPosition += interval))
            window.requestAnimationFrame(scrollOnce)
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            $('html,body').scrollTop(y)
        }
    }
    window.requestAnimationFrame(scrollOnce)
}
/**
 * 获取ScrollTop
 * @returns
 */
export function getScrollTop(): number {
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop
}

/**
 * 获取当前可视范围的高度
 * @returns
 */
export function getClientHeight(): number | string {
    return document.documentElement.clientHeight || document.body.clientHeight || 0
}

/**
 * 获取文档完整的高度
 * @returns
 */
export function getScrollHeight(): number | string {
    return document.documentElement.scrollHeight || document.body.scrollHeight || 0
}

/**
 * 按照某个字段排序
 * @param {array} list
 * @param {string} key
 * @return {array}
 */
export function sortListByKey(list: Array<any>, key: string): Array<any> {
    function compare(key): any {
        return function (a, b): string | number {
            const value1 = a[key]
            const value2 = b[key]
            return value1 - value2
        }
    }
    return list.sort(compare(key))
}


/**
 * 防抖
 * @param {function} fn
 * @param {number} wait
 * @param {boolean} immediate 是否立即执行
 */
export function debounce(fn: () => void, wait = 1000, immediate = true): () => void {
    let timer = null

    return function (...args: []) {
        // const _that = this
        // const args = arguments
        if (timer) clearTimeout(timer)
        if (immediate) {
            const callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            callNow && fn.apply(this, args)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }
}

/**
 * 判断是否为微信小程序
 */
export function isWxMiniProgram(): Promise<boolean | string> {
    const ua = window.navigator.userAgent.toLowerCase()
    return new Promise((resolve) => {
        setTimeout(() => resolve(false), 3000)
        if (ua.indexOf('micromessenger') === -1) {
            resolve(false)
        } else {
            window.wx &&
                window.wx.miniProgram &&
                window.wx.miniProgram.getEnv((res) => {
                    resolve(res.miniprogram)
                })
        }
    })
}

/**
 * 根据ua判断是否为微信小程序 微信7.0.0以上版本（2018/12）
 */
export function isWxMiniUa(): boolean {
    const ua = window.navigator.userAgent
    const isWxProgram = ua.indexOf('miniProgram') > -1
    if ($.wechat && isWxProgram) {
        return true
    } else {
        return false
    }
}

/**
 * 截取链接后面所需要的参数
 * @param name  所要获取的链接后面的key
 * @returns {*}
 */
export function getQueryString(url: string, name: string): null | string | undefined {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r
    if (url) {
        const index = url.indexOf('?')
        if (index == -1) return
        const arr = url.split('?')
        r = arr[1].match(reg)
    } else {
        r = window.location.search.substr(1).match(reg)
    }
    if (r !== null) {
        return unescape(r[2])
    }
    return null
}

export function handleDecimal(num: any) {
    if (Number(num) > 1000) {
        return parseInt(num)
    } else if (Number(num) > 100) {
        return fixDecimal(num, 1)
    } else {
        return fixDecimal(num, 2)
    }
}

export function handleOneDecimal(num: any) {
    if (Number(num) > 1000) {
        return parseInt(num)
    } else {
        return fixDecimal(num, 1)
    }
}

export function fixDecimal(num: any, bit: number): string | number {
    let result
    const numStr = String(num)
    const index = numStr.indexOf('.')

    if (index > -1) {
        result = parseFloat(numStr.slice(0, index + bit + 1))
    } else {
        result = parseFloat(numStr)
    }
    return isNaN(result) ? '' : result
}

export function fixOneDecimal(num: any): string | number {
    if (num === '') {
        return num
    } else {
        num = Math.floor(num * 10000) / 10000
        const oneDecimal = Math.ceil(num * 10) / 10
        if (isNaN(oneDecimal)) {
            return ''
        } else {
            return oneDecimal
        }
    }
}


/**
 * 格式化时间
 * @param {number} timestamp
 * @param {string} format
 */
interface dateInfos {
    Y: string
    M: string | number
    D: string | number
    h: string | number
    m: string | number
    s: string | number
}
export function formatDate(timestamp: number = Date.now(), format = 'Y-M-D h:m:s'): string {
    const date = new Date(timestamp)
    const dateInfo: dateInfos = {
        Y: date.getFullYear().toString(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    }

    const formatNumber = (n) => (n > 10 ? n : '0' + n)
    return format
        .replace('Y', dateInfo.Y)
        .replace('M', formatNumber(dateInfo.M))
        .replace('D', formatNumber(dateInfo.D))
        .replace('h', formatNumber(dateInfo.h))
        .replace('m', formatNumber(dateInfo.m))
        .replace('s', formatNumber(dateInfo.s))
}

/**
 * 获取某一段毫秒数内的时分秒
 * @param time 时间差值
 */
export function getHMS(time: number | string): HmsObject {
    if (!time) return null
    const second = Math.floor(Number(time) / 1000) // 总秒数
    const hours = Math.floor((second / 3600) % 24) // 小时
    const minutes = Math.floor((second / 60) % 60) // 分钟
    const seconds = Math.floor(second % 60) // 秒
    return {
        hours,
        minutes,
        seconds
    }
}
export function isInOneDay(time: timestamp): boolean {
    return time > 0 && time < 86400000
}

export function getExpireDays(time: timestamp) {
    const differDay = time / 1000 / 60 / 60 / 24
    return Math.floor(differDay)
}

//版本号补全
export function toNum(ab) {
    const a = ab.toString()
    const cb = a.split('.').map((e) => {
        return e.padStart(4, '0')
    })
    return cb.join('')
}
// 兼容写法
// eslint-disable-next-line
; (function (): void {
    let lastTime = 0
    const vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'] // Webkit中此取消方法的名字变了
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            const currTime = new Date().getTime()
            const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            const id = window.setTimeout(function () {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
})()
