/**
 * 为 art-template 添加过滤器函数库
 */

import Runtime from 'art-template/lib/runtime'
import { replaceUimgParam, fixOneDecimal, dealRecommendPrice } from './utils'

/**
 * 图片后面增加链接参数
 */
Runtime.replaceUimgParam = replaceUimgParam

Runtime.addLinkNavbarParam = function (url) {
    if ($.base.getQueryString('wx_navbar_transparent')) {
        const sign = url.indexOf('?') > -1 ? '&' : '?'
        url += sign + 'wx_navbar_transparent=true'
    }
    return url
}

/**
 * encode 榜单名字
 * @param labelName
 * @returns {boolean|string|string}
 */
Runtime.labelNameFormat = function (labelName) {
    return (typeof labelName === 'string' && encodeURI(labelName)) || ''
}

/**
 * 大于一万取XX.X万
 * @param count
 * @returns {boolean|string|*}
 */
Runtime.countFormat = function (count) {
    return (typeof count === 'number' && count > 9999 && (count / 10000).toFixed(1) + '万') || count
}
Runtime.fixOneDecimal = fixOneDecimal
Runtime.dealRecommendPrice = dealRecommendPrice
