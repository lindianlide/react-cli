
/**
 * 显示最长为len的数字，超出通过'+'显示
 * @param {Number} num
 * @param {Number} len
 */
export function fixedNumLen(num, len = 6) {
    const standardArr = new Array(len).fill(9)
    const standardNum = parseInt(standardArr.join(''))
    const resNum = parseInt(new Array(len).fill(9).join('')) + '+'
    return typeof num === 'number' && !isNaN(num) && num > standardNum ? resNum : num
}

/**
 * 截取数组整数倍（num）的长度
 * @param {Array} array
 * @param {Number} num
 * @param {Number} maxNum
 */
export function fixedArrayLen(array, num = 3, maxNum = 6) {
    const len = array.length
    const endLen = Math.min(len - (len % num), maxNum)
    return Array.isArray(array) ? array.slice(0, endLen) : []
}
