// 目标:将错误信息进行返回
import { AxiosRequestConfig, AxiosResponse } from '../types'

// 收集更多的错误信息进行返回 继承Error
export class AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  ajax?: any
  response?: AxiosResponse
  isAxiosError: boolean

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    ajax?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.ajax = ajax
    this.response = response
    this.isAxiosError = true
    // 因为TS存在坑,实例化之后无法找到基类的信息，所以强制绑定到当前类上
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 该工厂方法 导出供外部使用
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  ajax?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, ajax, response)
  return error
}
