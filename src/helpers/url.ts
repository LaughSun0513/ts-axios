/*
  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: ['bar', 'baz']
    }
  })
  ===> /base/get?foo[]=bar&foo[]=baz  //参数为数组
  
  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: {
        bar: 'baz'
      }
    }
  })
  ===> /base/get?foo=%7B%22bar%22:%22baz%22%7D //参数值为对象
  
  axios({
    method: 'get',
    url: '/base/get',
    params: {
      date:new Date()
    }
  })
  ===> /base/get?date=2019-04-01T05:55:39.030Z //参数值为 Date 类型

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: '@:$, '
    }
  })
  ===> /base/get?foo=@:$+  //特殊字符支持 把空格转换成 +

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: 'bar',
      baz: null
    }
  })
  ===> /base/get?foo=bar //空值忽略

  axios({
    method: 'get',
    url: '/base/get#hash',
    params: {
      foo: 'bar'
    }
  })
  ===>/base/get?foo=bar //丢弃 url 中的哈希标记

  axios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
      bar: 'baz'
    }
  })
  ==> /base/get?foo=bar&bar=baz //保留 url 中已存在的参数
*/
import { isObject, isDate } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
