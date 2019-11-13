// post 请求需处理header请求头
import { isObject, deepClone } from './utils'
import { Method } from '../types'
export function processHeaders(headers: any, data: any): any {
  // case1:有headers 有data 有Content-Type 按照当前的传
  // case2:如果没有headers 有data 默认传递 'application/json;charset=utf-8'
  // case3:有headers 有data 没有Content-Type 默认传递 'application/json;charset=utf-8'
  let normalizedName = 'Content-Type'
  if (!headers) {
    return
  }
  // case1
  Object.keys(headers).forEach(name => {
    if (name.toUpperCase() === normalizedName.toUpperCase()) {
      if (headers && isObject(data)) {
        headers[normalizedName] = headers[name]
        delete headers[name] // 保留统一规范格式的Content-Type
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

// 将字符串的请求头信息转换为JSON格式
/*
"date: Fri, 27 Sep 2019 07:50:12 GMT
etag: W/"15-3q68Lq+66m79m6RDU+Rqxq1L80A"
connection: keep-alive
x-powered-by: Express
content-length: 21
content-type: application/json; charset=utf-8
"
===>{
  date: 'Fri, 05 Apr 2019 12:40:49 GMT',
  etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
  connection: 'keep-alive',
  'x-powered-by': 'Express',
  'content-length': '13'
  'content-type': 'application/json; charset=utf-8'
}
*/
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null) // 创建个空对象
  if (!headers) {
    return parsed
  }
  // 根据字符串中的空格和回撤来切割 \r\n
  headers.split('\r\n').forEach(perLine => {
    let [key, val] = perLine.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val // 将key-value 存入对象
  })
  return parsed
}

/*
将headers压成一层数据结构
headers: {
  common: {
    Accept: 'application/json, text/plain, *'
  },
  post: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
}
==> 
headers: {
  Accept: 'application/json, text/plain, *',
  'Content-Type':'application/x-www-form-urlencoded'
}
*/
export function flattenHeader(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepClone(headers.common || {}, headers[method] || {}, headers) // 将所有headers的配置都拿到

  // 删除对应的headers
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
