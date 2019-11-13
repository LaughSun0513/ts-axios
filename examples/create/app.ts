import axios, { AxiosTransformer } from '../../src/index';
import qs from 'qs';

// 目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。
// 我们希望提供了一个 axios.create 的静态接口允许我们创建一个新的 axios 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/create',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
