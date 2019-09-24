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
router.get('/simple/get',(req,res)=>{
    res.json({
      success:true,
      msg:"Hello Typescript"
    })
})
app.use(router);
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
  console.log(`Server is listening on http://localhost:${PORT}`)
});
module.exports = app;