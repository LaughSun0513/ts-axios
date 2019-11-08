// 实现具体的拦截器执行机制
import { ResolveFn, RejectFn } from '../types'
// 当前拦截器的数据结构
interface InterceptorItem<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}
// 泛型类
// T-AxiosRequestConfig 就是request修改config的拦截器
// T-AxiosResponse 就是response修改res的拦截器
export default class MyInterceptors<T> {
  private interceptorList: Array<InterceptorItem<T> | null>
  constructor() {
    this.interceptorList = []
  }
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptorList.push({
      resolved,
      rejected
    })
    return this.interceptorList.length - 1 // 返回当前拦截器的id
  }
  forEach(fn: (currentInterceptor: InterceptorItem<T>) => void): void {
    this.interceptorList.forEach(currentInterceptor => {
      if (currentInterceptor !== null) {
        fn(currentInterceptor) // 如果存在当前的拦截器，就把该拦截器返回出去 执行fn回调
      }
    })
  }
  eject(id: number): void {
    if (this.interceptorList[id]) {
      this.interceptorList[id] = null // 取消当前拦截器
    }
  }
}
