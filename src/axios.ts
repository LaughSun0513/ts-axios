import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

// 实现混合对象
// 首先这个对象是一个函数，其次这个对象要包括 Axios 类的所有原型属性和实例属性
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config) // 实例化Axios
  const instance = Axios.prototype.request.bind(context) // 通过bind生成一个新的函数，调用Axios类里的request方法 ,绑定上下文context
  extend(instance, context) // 将context里的方法混合到instance这个函数对象里
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios
