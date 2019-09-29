const toString = Object.prototype.toString

export function isObject(obj: any): obj is Object {
  return toString.call(obj) === '[object Object]'
}
export function isDate(obj: any): obj is Date {
  return toString.call(obj) === '[object Date]'
}
// extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性
// 用到了交叉类型，并且用到了类型断言
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
