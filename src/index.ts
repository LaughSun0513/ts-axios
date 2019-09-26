import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'
import { isObject } from './helpers/utils'

function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
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
  config.data = transformRequestData(config)
}
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}
export default axios
