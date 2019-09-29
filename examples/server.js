const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const webpack = require('webpack');
const webpackConf = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConf);
const router = express.Router();

//webpack-dev-server内部实现的核心就是该中间件
/* 类似以下功能
devServer: {
   publicPath: '/__build__/',
},
*/
app.use(webpackDevMiddleware(compiler,{
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));
//类似热更新的插件
app.use(webpackHotMiddleware(compiler));

//可以忽略当前项目的目录，直接访问资源
//app.use(express.static('public'));   
//--->可以访问public/index.html -> http://localhost:3000/hello.html

//app.use('/static', express.static('public')); 
//--->可以访问可以访问具有 /static 路径前缀的 public 目录中的文件 --->http://localhost:3000/static/hello.html
app.use(express.static(__dirname));

// application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//路由，响应客户端请求的API http://localhost:8000/simple/get
registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()

app.use(router);
const PORT = process.env.PORT || 8202;

app.listen(PORT,()=>{
  console.log(`Server is listening on http://localhost:${PORT}`)
});
module.exports = app;

//---------抽象响应的路由函数----------------
function registerSimpleRouter(){
  router.get('/simple/get',(req,res)=>{
    res.json({
      success:true,
      msg:"Hello Typescript"
    })
  });
}
function registerBaseRouter(){
    // 响应post请求
    router.post('/base/post', function(req, res) {
      res.json(req.body)
    });

    // 响应buffer数据流
    router.post('/base/buffer', function(req, res) {
      let msg=[];
      req.on("data",chunk=>{
        msg.push(chunk);
      });
      req.on("end",()=>{
        let buf = Buffer.concat(msg);
        res.json(buf.toJSON());
      });
    })
}
function registerErrorRouter(){
  // 响应错误
  router.get('/error/get', function(req, res) {
    if(Math.random()>0.5){
      res.json({
        msg:"Good!! get data!! Not error!!"
      })
    }else{
      res.status(500);
      res.end();
    }
  });
  // 响应超时错误
  router.get('/error/timeout', function(req, res) {
    setTimeout(()=>{
      res.json({
        msg:"Oops!! Time Out!!"
      })
    },3000)
  });
}
function registerExtendRouter(){
  router.get('/extend/get',(req,res)=>{
    res.json({
      msg:"extend/get"
    })
  });
  router.options('/extend/options',(req,res)=>{
    res.json({
      msg:"extend/options"
    })
  });
  router.delete('/extend/delete',(req,res)=>{
    res.json({
      msg:"extend/delete"
    })
  });
  router.head('/extend/head',(req,res)=>{
    res.json({
      msg:"extend/head"
    })
  });
  router.post('/extend/post',(req,res)=>{
    res.json({
      msg:"extend/post"
    })
  });
  router.put('/extend/put',(req,res)=>{
    res.json({
      msg:"extend/put"
    })
  });
  router.patch('/extend/patch',(req,res)=>{
    res.json({
      msg:"extend/patch"
    })
  });
}