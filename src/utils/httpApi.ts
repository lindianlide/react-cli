/**
 * HttpApi
 */
// import { httpService, jsonpService } from './http'
import { httpService, jsonpService } from './axios'
import hosts from '../config/hosts'

// const IS_DEV = 'development' === process.env.NODE_ENV || 'DEV' === process.env.SELF_ENV
// const baseUrlDev = '//localhost.com:8000'
// const baseUrl = IS_DEV ? baseUrlDev : ''

const baseUrl = ''
const urlConstant = {
    getBatchModule: '/api/batch.do',
}

class HttpApi {
    /**
     *  用途：模块数据查询
     *  返回code为1表示成功，code为0表示失败
     *  @method get
     *  @return {promise}
     */

    async getBatchModule<T extends QueryModuleParams>(data: T): Promise<Array<ModuleResponseData | null>> {
        const resList: Array<ModuleResponseData | null> = []
        try {
            const queryParams = await getQueryParams()
            const res = await httpService({
                params: data,
                url: urlConstant.getBatchModule,
                base: baseUrl,
                needToast: false
            })

            return resList
        } catch (err) {
            if (err && err.code && err.code !== '403') {
                //
            }
            return resList
        }
    }



    /**
     *  用途：查询地址信息
     *  @method get
     *  @return {promise}
     */
    async getAddressInfo() {
        let resData = {}
        try {
            const res = await jsonpService({
                base: hosts.ipserviceDomain + urlConstant.getAddressInfo,
                jsonpCallback: 'jsonpCallback'
            })
            if (res.status === 1) {
                resData = res
            }
            return resData
        } catch (err) {
            return resData
        }
    }

}

export default new HttpApi()
