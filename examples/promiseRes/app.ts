import axios from '../../src/index';
// 目标:post请求，返回promise的返回结果
axios({
  url:"/base/post",
  method:"post",
  data:{
    promise:"promise"
  }
}).then(res=>{
  console.log(res);
})