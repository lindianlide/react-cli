import http from '../util/http'
import { dm_tool } from '@/util/common'
const urlConstant = {
    url1: '/api/a.do'
}

class Api {

    /**
     *  用途：查询接口
     *  返回code为0表示成功，code为1表示失败
     *  @method get
     *  @return {promise}
     */
    async getInfo(params = {}) {
        try {
            let res = await http.get(urlConstant.url1, { params })
            if (res && res.code === '0' && res.data) {
                return res.data
            } else if (res && res.code === '1') {
                console.log('异常')
            }
        } catch (err) {
            console.log('异常')
        }
    }

}

export default new Api()
