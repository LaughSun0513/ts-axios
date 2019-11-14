import axios, { Canceler } from '../../src/index'

// 方式一：通过调用source触发cancel函数
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('11111 Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  
  axios.post('/cancel', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    // test token如果已被使用，该请求发不出去
    if (axios.isCancel(e)) {
      console.log(e.message+'22222')
    }
  })
}, 100)

// 第二种取消方式--通过实例取消
let cancel: Canceler

axios.get('/cancel', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled'+"3333")
  }
})

setTimeout(() => {
  cancel()
}, 200)