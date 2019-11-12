import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { buildURL } from '../helpers/url'
import { isObject } from '../helpers/utils'
import { processHeaders, flattenHeader } from '../helpers/header'
import xhr from './xhr'

// get请求 转换URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params) // 因为url为可选参数 所以会报错 这里加！表示url为非空
}
// post请求 添加请求头
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
// post请求 序列化data
function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  if (isObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeader(config.headers, config.method!)
}
// 把返回值data转换为JSON格式
function transformDataToJson(res: any): any {
  if (typeof res.data === 'string') {
    try {
      res.data = JSON.parse(res.data)
    } catch (e) {
      // do nothing
    }
  }
  return res
}
async function dispatchRequest(config: AxiosRequestConfig) {
  processConfig(config)
  const res = await xhr(config)
  return transformDataToJson(res)
}
export default dispatchRequest
