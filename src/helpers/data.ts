import { AxiosRequestConfig } from '../types'
import { isObject } from './utils'
// post请求 序列化data
export function transformRequestData(data: any): any {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}
// 把返回值data转换为JSON格式
export function transformDataToJson(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
