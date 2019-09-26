// post 请求需处理header请求头
import { isObject } from './utils'
export function processHeaders(headers: any, data: any): any {
  // case1:有headers 有data 有Content-Type 按照当前的传
  // case2:如果没有headers 有data 默认传递 'application/json;charset=utf-8'
  // case3:有headers 有data 没有Content-Type 默认传递 'application/json;charset=utf-8'
  let normalizedName = 'Content-Type'
  // case1
  Object.keys(headers).forEach(name => {
    if (name.toUpperCase() === normalizedName.toUpperCase()) {
      if (headers && isObject(data)) {
        headers[normalizedName] = headers[name]
        delete headers[name]
        return headers
      }
    }
  })
  let case2 = !headers && isObject(data)
  let case3 = headers && isObject(data) && !headers[normalizedName]
  if (case2 || case3) {
    headers[normalizedName] = 'application/json;charset=utf-8'
  }
  return headers
}
