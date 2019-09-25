const toString = Object.prototype.toString

export function isObject(obj: any): obj is Object {
  return toString.call(obj) === '[object Object]'
}
export function isDate(obj: any): obj is Date {
  return toString.call(obj) === '[object Date]'
}
