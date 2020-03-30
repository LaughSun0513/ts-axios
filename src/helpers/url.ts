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
import { isObject, isDate, isURLSearchParams } from './utils'
import { resolve } from 'dns'

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

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }
  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

// 这么写代码不优雅
/*export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }
  const keysArr = Object.keys(params);
  const parts: string[] = [];
  keysArr.forEach(key => {
    let val = params[key];
    if (val === null || val === 'undefined') {
      return;
    }
    let onePart = '';
    if (Array.isArray(val)) {
      // val-->['bar', 'baz'] --> foo[]=bar,foo[]=baz
      key = key + "[]";
      val.forEach(item => {
        onePart = `${encode(key)}=${encode(item)}` // 'foo[]=bar'
        parts.push(onePart); // '["foo[]=bar","foo[]=baz"]'
      });
    }
    else if (isObject(val)) {
      val = JSON.stringify(val); // "{ bar: 'baz'}"
      onePart = `${encode(key)}=${encode(val)}`
      parts.push(onePart);
    }
    else if (isDate(val)) {
      val = val.toISOString() // 2019-04-01T05:55:39.030Z
      onePart = `${encode(key)}=${encode(val)}`
      parts.push(onePart);
    }
    else {
      onePart = `${encode(key)}=${encode(val)}`
      parts.push(onePart);
    }
  });
  let finalParams = parts.join("&"); // "foo[]=bar&foo[]=baz"
  if (url.indexOf("#") > 0) { // /base/get#hash --> /base/get
    let markIndex = url.indexOf("#");
    url = url.slice(0, markIndex) + "?" + finalParams; // -->/base/get#hash
  }
  else if (url.indexOf("?") > 0) { // /base/get?foo=bar
    url = url + "&" + finalParams;
  }
  else {
    url = url + "?"+finalParams;
  }

  return url;
}*/

// 解析URL是否属于同域
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
// 解析URL中的 协议 域名 端口
interface URLOrigin {
  protocol: string // http or https
  host: string // 域名+端口
}
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url) // 利用a标签来解析当前请求的域
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
export function isURLSameOrigin(requestURL: string): boolean {
  const reqURLOrigin = resolveURL(requestURL)
  return (
    reqURLOrigin.protocol === currentOrigin.protocol && reqURLOrigin.host === currentOrigin.host
  ) // 判断是否同域
}
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
