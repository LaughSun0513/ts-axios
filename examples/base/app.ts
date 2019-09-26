import axios from '../../src/index';

axios({
  method: 'get',
  url: '/base/get',
  params: {
    array: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    object: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    signal: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    isNull: 'isNUll',
    isA: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'isHash'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'hasParams'
  }
});

axios({
  method: "post",
  url: "/base/post",
  data: {
    a: "data01",
    b: "data02"
  }
});

const arr = new Int32Array([20, 30]);
axios({
  method: "post",
  url: "/base/buffer",
  data: {
    arr
  }
})