/**
 * @version v1.0.0
 *
 * deepGet 方法,用户获取多层对象中的属性,返回默认值
 * params:
 *   object 根对象,必传
 *   path 数组或者字符串,必传 eg: 'a.b.c' \\ ['a', 'b', 'c']
 *   defaultValue 默认值, 非必传
 */

const object = {
    deepGet: (object, path, defaultValue) => {
        let data = !Array.isArray(path)
            ? path
                .replace(/\[/g, '.')
                .replace(/\]/g, '')
                .split('.')
            : path
        data = data.reduce((o, k) => (o || {})[k], object)
        return data !== undefined && data !== null ? data : defaultValue
    }
}

export default object
