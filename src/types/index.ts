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
  url?: string // 请求的地址
  method?: Method // 请求的 HTTP 方法
  params?: any // get、head 等类型请求的参数
  data?: any // post、patch 等类型请求的数据
  headers?: any // 请求头
  responseType?: XMLHttpRequestResponseType // 可以指定返回时响应的数据类型 ==> "" | "arraybuffer" | "blob" | "document" | "json" | "text"
  timeout?: number
  // 实现请求和响应配置化
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean

  xsrfCookieName?: string
  xsrfHeaderName?: string

  [propName: string]: any
}
// ajax返回的数据解构
export interface AxiosResponse<T = any> {
  data: T // 服务端返回的数据 这里不再使用any，而是用泛型来控制
  status: number // HTTP状态码
  statusText: string // 状态消息
  headers: any // 请求头信息
  config: AxiosRequestConfig // 请求的参数配置
  ajax: any // 请求的XMLHttpRequest 对象实例
}

// ajax返回的数据解构 promise化 同时接收泛型数据结构
export interface AxiosResponsePromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  request<T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
  interceptors: {
    // 拦截器要控制的数据结构
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  defaults: AxiosRequestConfig
}
// 混合类型的接口 既包含Axios接口里的方法 又包含自己的方法
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
}
// 拦截器接口 -- 场景:可以在发送请求前 加工config(比如加点参数) 响应回来前可以添加点啥
// config --> config2 --> config3 ---> send ajax --> res1 ---> res2 ---> 最终的res
// axios.interceptors.request.use(resolved,rejected) || axios.interceptors.request.eject(id)
// axios.interceptors.response.use(resolved,rejected) || axios.interceptors.response.eject(id)
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number
  eject(id: number): void
}
export interface ResolveFn<T> {
  (val: T): T | Promise<T> // use的resolve函数返回范型函数 | 或者Promise
}
export interface RejectFn {
  (error: any): any
}
// 实现请求和响应配置化
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
// 添加axios.create扩展接口
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
// axios.CancelToken类的接口定义
export interface CancelToken {
  // promise:Promise<string>
  // reason?:string
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
// cancel函数的接口定义
export interface Canceler {
  (message?: string): void
}
// new CancelToken(cancelFunc) cancelFunc返回的cancel函数的接口定义
export interface CancelExecutor {
  (cancel: Canceler): void
}
// axios.CancelToken.source().token / axios.CancelToken.source().cancel()
export interface CancelTokenSource {
  token: CancelToken // 最终目的：利用promise来控制取消请求的状态
  cancel: Canceler
}
// 实现静态方法
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken // 最终目的：利用promise来控制取消请求的状态 所以source.token和new CancelToken最终的结果一样
  source(): CancelTokenSource // source函数返回source.token和source.cancel()
}
// 实例类型的接口定义
export interface Cancel {
  message?: string
}
// 类类型的接口定义
export interface CancelStatic {
  new (message?: string): Cancel
}
