import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

// 实现混合对象
// 首先这个对象是一个函数，其次这个对象要包括 Axios 类的所有原型属性和实例属性
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config) // 实例化Axios
  const instance = Axios.prototype.request.bind(context) // 通过bind生成一个新的函数，调用Axios类里的request方法 ,绑定上下文context
  extend(instance, context) // 将context里的方法混合到instance这个函数对象里
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
