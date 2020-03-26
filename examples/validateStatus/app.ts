import axios, { AxiosError } from '../../src/index';

// 默认的请求我们会输出一条错误信息 Request failed with status code 304 
axios.get('/304').then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message) // Request failed with status code 304
})

// 配置了自定义合法状态码规则 可以正常输出响应对象 {status: 304, statusText: "Not Modified", data: "", headers: {…}, config: {…}, …}
axios.get('/304', {
    validateStatus(status) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log(res);
}).catch((e: AxiosError) => {
    console.log(e.message)
})