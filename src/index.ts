import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { isObject } from './helpers/utils'
import { processHeaders } from './helpers/header'
import xhr from './xhr'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
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
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}
export default axios
