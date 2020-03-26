import axios from '../../src/index';
// HTTP授权
axios.post('/auth', {
    a: 1
  }, {
    auth: {
      username: 'Auth',
      password: '123456'
    }
  }).then(res => {
    console.log(res)
  })
  // HTTP 协议中的 Authorization 请求 header 会包含服务器用于验证用户代理身份的凭证，通常会在服务器返回 401 Unauthorized 状态码以及 WWW-Authenticate 消息头之后在后续请求中发送此消息头。
  // 一旦用户在请求的时候配置这俩属性，我们就会自动往 HTTP 的 请求 header 中添加 Authorization 属性，它的值为 Basic 加密串。 这里的加密串是 username:password base64 加密后的结果
  /* 
  在Req Header中添加Authorization
  Accept: application/json,text/plain,
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
  Authorization: Basic QXV0aDoxMjM0NTY=
  */