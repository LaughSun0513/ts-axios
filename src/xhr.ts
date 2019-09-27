import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from './types'
import { parseHeaders } from './helpers/header'

export default function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config
    const ajax = new XMLHttpRequest()
    ajax.open(method.toUpperCase(), url, true)
    // 检测是否发送请求头
    if (data !== null && headers) {
      Object.keys(headers).forEach(name => {
        if (name.toLowerCase() === 'content-type') {
          ajax.setRequestHeader(name, headers[name])
        }
      })
    }
    // responseType和返回的值 response|responseText 有关系
    // responseText只是返回结果中的一种，就是字符串的形式
    if (responseType) {
      ajax.responseType = responseType
    }
    ajax.onreadystatechange = () => {
      if (ajax.status === 200 && ajax.readyState === 4) {
        // 表示请求成功
        // 目标：把ajax返回值变为promise的结果
        const response = responseType && responseType === 'text' ? ajax.responseText : ajax.response // 如果不是字符串的结果 那就是其他类型的数据结果
        const headerInfo = ajax.getAllResponseHeaders()
        const result: AxiosResponse = {
          status: ajax.status,
          statusText: ajax.statusText,
          data: response,
          headers: parseHeaders(headerInfo),
          config,
          ajax
        }
        resolve(result)
      }
    }
    // 官方写法 检测是否发送请求头
    /*
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        ajax.setRequestHeader(name, headers[name])
      }
    })
    */
    ajax.send(data)
  })
}
