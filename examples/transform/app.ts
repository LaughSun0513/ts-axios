import axios, { AxiosTransformer } from '../../src/index';
import qs from 'qs';

axios({
  transformRequest: [(function (data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') { // 在返回的data里添加b {a: "1", b: 2}
        data.b = 2
      }
      return data
    }
  ],
  url: '/transform',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

/*
+ Accept: application/json,text/plain,*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: keep-alive
Content-Length: 3
+ Content-Type: application/x-www-form-urlencoded
Host: localhost:8202
Origin: http://localhost:8202
Referer: http://localhost:8202/transform/
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
+ a: 1
*/