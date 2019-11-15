import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config
    const ajax = new XMLHttpRequest()
    ajax.open(method.toUpperCase(), url!, true)
    // 检测是否发送请求头 如果是content-type就算了，其他的可以带过去
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        ajax.setRequestHeader(name, headers[name])
      }
    })
    // responseType和返回的值 response|responseText 有关系
    // responseText只是返回结果中的一种，就是字符串的形式
    if (responseType) {
      // 用户手动设置responseType
      ajax.responseType = responseType
    }
    if (withCredentials) {
      ajax.withCredentials = withCredentials
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
        const response = responseType && responseType === 'text' ? ajax.responseText : ajax.response
        reject(
          createError(
            `Request failed with status code ${ajax.status}`,
            config,
            null,
            ajax,
            response
          )
        )
      }
    }
    // case2 网络错误
    ajax.onerror = () => {
      reject(createError('Network Error', config, null, ajax))
    }
    if (timeout) {
      // 用户手动设置timeout
      ajax.timeout = timeout
    }
    // case3 超时错误
    ajax.ontimeout = () => {
      reject(createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', ajax))
    }
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        ajax.abort()
        reject(reason)
      })
    } else {
      ajax.send(data)
    }
  })
}
