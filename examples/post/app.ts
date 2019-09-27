import axios from '../../src/index';
// 目标1:post请求，返回对应的数据
// 目标2:post请求，自动设置请求头

// post请求--传递buffer数据
const int32Array = new Int32Array([20, 30]);
axios({
  method: "post",
  url: "/base/buffer",
  data: {
    int32Array
  }
});

// post请求--当有data没headers 默认会传递headers
// 在Request Header中添加 Content-Type: application/json;charset=UTF-8
axios({
  method: "post",
  url: "/base/post",
  data: {
    defaultHeaders: "default have headers",
  }
});

// 在Request Header中手动添加 Content-Type: application/json;charset=UTF-8
axios({
  method: "post",
  url: "/base/post",
  headers:{
    "content-type":"application/json;charset=UTF-8"
  },
  data: {
    changeHeaders:"changeHeaders"
  }
});

// URLSearchParams类型的数据，在Request Header中默认匹配 Content-Type: application/x-www-form-urlencoded;charset=UTF-8
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
});

// 只传headers 没有data 会忽略当前修改的headers请求头
axios({
  method: "post",
  url: "/base/post",
  headers:{
    "content-type":"text/plain"
  }
});