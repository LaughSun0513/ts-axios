import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { buildURL } from '../helpers/url'
import { isObject } from '../helpers/utils'
import { processHeaders } from '../helpers/header'
import xhr from './xhr'

// get请求 转换URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
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
}
// 把返回值data转换为JSON格式
function transformDataToJson(res: any): any {
  if (typeof res.data === 'string') {
    res.data = JSON.parse(res.data)
  }
  return res
}
function dispatchRequest(config: AxiosRequestConfig): AxiosResponsePromise {
  processConfig(config)
  return xhr(config).then(res => {
    return (res = transformDataToJson(res))
  })
}
export default dispatchRequest
