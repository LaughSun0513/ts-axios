import axios, { AxiosError } from '../../src/index'
// 错误case1:网络错误
// 错误case2:超时错误
// 错误case3:非正常状态码错误

// 错误url 模拟404错误
axios({
    method: 'get',
    url: '/error/get1'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

// 模拟 正常请求 和 500
axios({
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

// 5s过程中 利用控制台Network中的offline 模拟网络错误
setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get'
    }).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}, 5000)

// 模拟手动设置超时
axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e.message)
})

// 外部可以使用内部的类型AxiosError，并打印出更多的错误信息
axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
  }).then((res) => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.config)
    console.log(e.ajax)
    console.log(e.response)
  })