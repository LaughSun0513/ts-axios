import axios from '../../src/index'
// 跨域请求目标:  http://localhost:8202/能访问到http://127.0.0.1:8288/more/server2的cookie的值
document.cookie = 'a=b'

axios.get('/withCredentials').then(res => {
  console.log(res)
})
/* Req Headers
Accept: application/json,text/plain,*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: keep-alive
+ Cookie: a=b                                  # http://localhost:8202/已种上cookie
Host: localhost:8202
If-Modified-Since: Fri, 15 Nov 2019 03:41:48 GMT
If-None-Match: W/"ce-16e6d271756"
Referer: http://localhost:8202/withCredentials/
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
*/
axios.post('http://127.0.0.1:8288/more/server2',{},{
  withCredentials: true // 关键代码
}).then(res => {
  console.log(res)
});
/* Res Header 服务器已接受跨域请求
+ Access-Control-Allow-Credentials: true
+ Access-Control-Allow-Headers: Content-Type
+ Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS
+ Access-Control-Allow-Origin: http://localhost:8202
Connection: keep-alive
Content-Length: 9
Content-Type: application/json; charset=utf-8
Date: Fri, 15 Nov 2019 06:07:56 GMT
ETag: W/"9-DBSa9QMkJ1axTHMSTev9taxjlpY"
X-Powered-By: Express
*/
/*
Accept: application/json,text/plain,*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: keep-alive
Content-Length: 2
Content-Type: application/json;charset=UTF-8
+ Cookie: c=d                                   #成功获取到cookie的值
Host: 127.0.0.1:8288
Origin: http://localhost:8202
Referer: http://localhost:8202/withCredentials/
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
*/