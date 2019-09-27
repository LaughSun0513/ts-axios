import axios from '../../src/index';
// 目标:get请求的时候自动转换了参数
// 参数为-数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    array: ['bar', 'baz']
  }
})

// 参数为-对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    object: {
      bar: 'baz'
    }
  }
})

// 参数为-日期对象
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 参数为-特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    signal: '@:$, '
  }
})

// 参数为-包含空值
axios({
  method: 'get',
  url: '/base/get',
  params: {
    isNull: 'isNUll',
    isA: null
  }
})

// 参数为-包含哈希
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'isHash'
  }
})

// URL保留了原有参数
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'hasParams'
  }
});

