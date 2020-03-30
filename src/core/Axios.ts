import {
  AxiosRequestConfig,
  AxiosResponsePromise,
  AxiosResponse,
  Method,
  ResolveFn,
  RejectFn
} from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import MyInterceptors from './interceptors'
import mergeConfig from './mergeConfig'
interface Interceptors {
  request: MyInterceptors<AxiosRequestConfig>
  response: MyInterceptors<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosResponsePromise)
  rejected?: RejectFn
}
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    // 拦截器的最终实现就是 MyInterceptors类的实例对象
    this.interceptors = {
      request: new MyInterceptors<AxiosRequestConfig>(),
      response: new MyInterceptors<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosResponsePromise {
    // 函数重载的使用
    // axios(config) / axios(url,config) 使用方式可以是一个参数,也可以是两个参数
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 合并默认配置和自定义传过来的配置
    config = mergeConfig(this.defaults, config)

    // 实现拦截器的链式调用
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest, // 这里发送请求
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(item => {
      chain.unshift(item) // request的执行顺序是倒序的，注册是123，执行是321，所以在dispatchRequest(config)发送请求前添加
    })
    this.interceptors.response.forEach(item => {
      chain.push(item) // response是在发送请求之后，所以在dispatchRequest(config)后执行
    })
    let promise = Promise.resolve(config)

    // 链式调用的执行机制关键代码
    while (chain.length) {
      const { resolved, rejected } = chain.shift()! // 这里的resolved就是每个use注册的函数
      console.log('链式调用==>', resolved, rejected)
      promise = promise.then(resolved, rejected) // 使用promise.then来实现
    }
    return promise
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
    data?: any,
    config?: AxiosRequestConfig
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
  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
  }
}
