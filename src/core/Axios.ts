import { AxiosRequestConfig, AxiosResponsePromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosResponsePromise {
    return dispatchRequest(config)
  }
  // 抽象函数 统一调request方法
  requestWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosResponsePromise {
    const newConfig = Object.assign(config || {}, {
      method,
      url
    })
    return this.request(newConfig)
  }
  requestWithData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
    data?: any
  ): AxiosResponsePromise {
    const newConfig2 = Object.assign(config || {}, {
      method,
      url,
      data
    })
    return this.request(newConfig2)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithoutData('get', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithoutData('head', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithoutData('delete', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this.requestWithData('patch', url, data, config)
  }
}
