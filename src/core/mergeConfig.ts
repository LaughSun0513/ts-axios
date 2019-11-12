import { AxiosRequestConfig } from '../types'
import { isObject, deepClone } from '../helpers/utils'

// 设计模式--策略模式
const strats = Object.create(null) // 接受key-func的映射关系
// 默认合并策略函数
function defaultConfigFunc(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
// 只接受自定义配置合并策略
function onlyVal2Func(val1: any, val2: any): any {
  if (val2 !== 'undefined') {
    return val2
  }
}
// 以下key只走onlyVal2Func函数
const keyFromVal2List = ['url', 'params', 'data']
keyFromVal2List.forEach(item => {
  strats[item] = onlyVal2Func
})
// 如果值为对象 需要深度拷贝策略
function deepMergeFunc(val1: any, val2: any): any {
  if (isObject(val2)) {
    return deepClone(val1, val2)
  } else if (val2 !== 'undefined') {
    return val2
  } else if (isObject(val1)) {
    return deepClone(val1)
  } else if (val1 !== 'undefined') {
    return val1
  }
}
const keyIsObjectVal = ['headers']
keyIsObjectVal.forEach(item => {
  strats[item] = deepMergeFunc
})
/**
 * @export
 * @param {AxiosRequestConfig} config1  默认配置
 * @param {AxiosRequestConfig} [config2] 自定义配置
 * @returns {AxiosRequestConfig}
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    // 没传配置，就是默认配置
    config2 = {}
  }
  const newConfig = Object.create(null)
  for (let key in config2) {
    accordingKeyToChoseMergeStrat(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      accordingKeyToChoseMergeStrat(key) // config2中没有的key
    }
  }
  function accordingKeyToChoseMergeStrat(key: string): void {
    const startFunc = strats[key] || defaultConfigFunc // 返回key对应的策略函数
    newConfig[key] = startFunc(config1[key], config2![key]) // 没有索引签名 需要AxiosRequestConfig添加 config2![key]可能为undefined故此断言
  }
  return newConfig
}
