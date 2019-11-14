import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { buildURL } from '../helpers/url'
import { isObject } from '../helpers/utils'
import { processHeaders, flattenHeader } from '../helpers/header'
import xhr from './xhr'
import transform from './transform'

// get请求 转换URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params) // 因为url为可选参数 所以会报错 这里加！表示url为非空
}
// post请求 添加请求头
/* function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
} */
// post请求 序列化data
/* function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  if (isObject(data)) {
    data = JSON.stringify(data)
  }
  return data
} */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  /* config.headers = transformHeaders(config)
  config.data = transformRequestData(config) */
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeader(config.headers, config.method!)
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
async function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config) // 发送请求前检查一下配置的 cancelToken 是否已经使用过了，如果已经被用过则不用发请求，直接抛异常
  processConfig(config)
  const res = await xhr(config)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
  // return transformDataToJson(res)
}
export default dispatchRequest
