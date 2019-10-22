import axios from '../../src/index'

// 可以使用之前的调用方式
axios({
  url: '/extend/get',
  method: 'get'
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

// 可以使用扩展的接口 省略method方法
axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

// 函数重载的使用
// 使用一个参数
axios({
  url:"/extend/post",
  method:"post",
  data:{
    msg:"have one config"
  }
})

// 使用两个参数
axios("/extend/post",{
  method:"post",
  data:{
    msg:"have two config"
  }
});

// 好处：预先定义好返回的数据类型
// 1 使用泛型接口 约束后端返回的接口数据类型
interface ResponseData<T=any>{
  code:number
  result:T
  message:string
}
// 2 泛型
interface User {
  name:string
  age:string
}
function getUser<T>(){
  // 4 接收泛型ResponseData<T>
  return axios<ResponseData<T>>('/extend/fanxing')
  .then(res=>res.data)
  .catch(err=>console.error(err));
}
async function test() {
    const user = await getUser<User>(); // 3 传入泛型
    if(user){
      console.log(user.result.name);
    }
}
test()