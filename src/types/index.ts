/**
 * GET： 请求指定的页面信息，并返回实体主体
 * HEAD:与GET方法一样，但服务器在响应请求时不会回传资源的内容部分，即：响应主体。
 *      可以不传输全部内容的情况下，就可以获取服务器的响应头信息。
 *      HEAD方法常被用于客户端查看服务器的性能。
 * DELETE： 请求服务器删除所请求URI（统一资源标识符，Uniform Resource Identifier）所标识的资源。DELETE请求后指定资源会被删除
 * OPTIONS:请求与HEAD类似,一般也是用于客户端查看服务器的性能,
 *          会请求服务器返回该资源所支持的所有HTTP请求方法
 *           会用'*'来代替资源名称
 *           可以测试服务器功能是否正常,XMLHttpRequest对象进行CORS跨域资源共享时，就是使用OPTIONS方法发送嗅探请求，以判断是否有对指定资源的访问权限
 * POST： 向指定资源提交数据，请求服务器进行处理，如：表单数据提交、文件上传等，请求数据会被包含在请求体中
 * PUT:通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容,
 *     一般用于资源的整体更新,当资源不存在时PUT只会对已在资源进行更新
 * PATCH:与PUT请求类似，同样用于资源的更新,
 *         一般用于资源的部分更新,当资源不存在时，PATCH会创建一个新的资源
 */

export type Method =
  | 'get'
  | 'GET'
  | 'head'
  | 'HEAD'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
export interface AxiosRequestConfig {
  url: string // 请求的地址
  method?: Method // 请求的 HTTP 方法
  params?: any // get、head 等类型请求的参数
  data?: any // post、patch 等类型请求的数据
  headers?: any // 请求头
  responseType?: XMLHttpRequestResponseType // 可以指定返回时响应的数据类型 ==> "" | "arraybuffer" | "blob" | "document" | "json" | "text"
  timeout?: number
}
// ajax返回的数据解构
export interface AxiosResponse {
  status: number // HTTP状态码
  statusText: string // 状态消息
  data: any // 服务端返回的数据
  headers: any // 请求头信息
  config: AxiosRequestConfig // 请求的参数配置
  ajax: any // 请求的XMLHttpRequest 对象实例
}

// ajax返回的数据解构 promise化
export interface AxiosResponsePromise extends Promise<AxiosResponse> {}

// 收集更多的错误信息进行返回，错误接口，供外部使用，继承Error
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  ajax?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 接口扩展
export interface Axios {
  request(config: AxiosRequestConfig): AxiosResponsePromise
  get(url: string, config?: AxiosRequestConfig): AxiosResponsePromise
  head(url: string, config?: AxiosRequestConfig): AxiosResponsePromise
  delete(url: string, config?: AxiosRequestConfig): AxiosResponsePromise
  options(url: string, config?: AxiosRequestConfig): AxiosResponsePromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise
}
// 混合类型的接口 既包含Axios接口里的方法 又包含自己的方法
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosResponsePromise
}
