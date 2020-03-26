import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

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
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    // 1.创建一个 request 实例
    const ajax = new XMLHttpRequest()
    // 2.执行 request.open 方法初始化
    ajax.open(method.toUpperCase(), url!, true)
    // 3.执行 configureRequest 配置 request 对象
    configureRequest()
    // 4.执行 addEvents 给 request 添加事件处理函数
    addEvents()
    // 5.执行 processHeaders 处理请求 headers
    processHeaders()
    // 6.执行 processCancel 处理请求取消逻辑
    processCancel()
    // 7.执行 request.send 方法发送请求
    ajax.send(data)

    function configureRequest(): void {
      // responseType和返回的值 response|responseText 有关系
      // responseText只是返回结果中的一种，就是字符串的形式
      if (responseType) {
        // 用户手动设置responseType
        ajax.responseType = responseType
      }
      if (withCredentials) {
        ajax.withCredentials = withCredentials
      }
      if (timeout) {
        // 用户手动设置timeout
        ajax.timeout = timeout
      }
    }

    function addEvents(): void {
      ajax.onreadystatechange = () => {
        if (ajax.readyState !== 4 || ajax.status === 0) {
          // 请求的每次变化都会进入,需提前抛出其他状态值的信息 readyState = 1,2,3
          return
        }
        // 表示请求成功
        // 目标：把ajax返回值变为promise的结果
        const responseData =
          responseType && responseType === 'text' ? ajax.responseText : ajax.response // 如果不是字符串的结果 那就是其他类型的数据结果
        const responseHeaders = parseHeaders(ajax.getAllResponseHeaders())
        const result: AxiosResponse = {
          status: ajax.status,
          statusText: ajax.statusText,
          data: responseData,
          headers: responseHeaders,
          config,
          ajax
        }
        handleResponse(result)
      }
      // case2 网络错误
      ajax.onerror = () => {
        reject(createError('Network Error', config, null, ajax))
      }

      // case3 超时错误
      ajax.ontimeout = () => {
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', ajax)
        )
      }
      if (onDownloadProgress) {
        ajax.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        ajax.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      // 如果允许跨域 || 同域 存在xsrfCookieName 就在前端headers带上token的值
      // 这里允许修改xsrfCookieName和xsrfHeaderName的名字
      if (withCredentials || (isURLSameOrigin(url!) && xsrfCookieName)) {
        const xsrfValue = cookie.readXSRFVal(xsrfCookieName!)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
      // 检测是否发送请求头 如果是content-type就算了，其他的可以带过去
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          ajax.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          ajax.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(result: AxiosResponse): void {
      // 如果没有配置 validateStatus 以及 validateStatus 函数返回的值为 true 的时候，都认为是合法的
      if (!validateStatus || validateStatus(ajax.status)) {
        resolve(result)
      } else {
        reject(
          createError(`Request failed with status code ${ajax.status}`, config, null, ajax, result)
        )
      }
    }
  })
}
