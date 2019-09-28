import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from './types'
import { parseHeaders } from './helpers/header'

export default function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
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
      // 用户手动设置responseType
      ajax.responseType = responseType
    }
    ajax.onreadystatechange = () => {
      if (ajax.readyState !== 4 || ajax.status === 0) {
        // 请求的每次变化都会进入,需提前抛出其他状态值的信息 readyState = 1,2,3
        return
      }
      if (ajax.status >= 200 && ajax.status < 300) {
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
      } else {
        // case1 非200状态码的错误
        reject(new Error(`Request failed with status code ${ajax.status}`))
      }
    }
    // case2 网络错误
    ajax.onerror = () => {
      reject(new Error('Network Error'))
    }
    if (timeout) {
      // 用户手动设置timeout
      ajax.timeout = timeout
    }
    // case3 超时错误
    ajax.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
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
