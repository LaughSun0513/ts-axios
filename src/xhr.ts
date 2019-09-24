import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config
  const ajax = new XMLHttpRequest()
  ajax.open(method.toUpperCase(), url, true)
  ajax.send(data)
}
