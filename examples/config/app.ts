import axios from '../../src/index'
import qs from 'qs'

// 可以通过axios.defaults.headers添加headers配置实现配置合并
axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
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
Referer: http://localhost:8202/config/
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
+ test: 321
+ test2: 123
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
+ a: 1
*/