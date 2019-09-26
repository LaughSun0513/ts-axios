import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config
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
  // 官方写法
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
}
