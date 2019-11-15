const path = require('path');
const fs = require('fs');
const express = require('express');
const {
  json,
  urlencoded
} = require('body-parser');
const app = express();
const webpack = require('webpack');
const webpackConf = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConf);
const cookieParser = require('cookie-parser');

require('./server2'); // 开启第二个服务

//webpack-dev-server内部实现的核心就是该中间件
/* 类似以下功能
devServer: {
   publicPath: '/__build__/',
},
*/
app.use(webpackDevMiddleware(compiler, {
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
app.use(json());
app.use(urlencoded({
  extended: true
}));
app.use(cookieParser());
// 预防CSRF:每次请求颁发一个token到cookie，下次前端请求携带该token在请求头
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

//路由，响应客户端请求的API http://localhost:8000/simple/get
const paths = path.resolve(__dirname,'./serverRoutes/');
const routesFiles = fs.readdirSync(paths);
const routersArr = [];
routesFiles.forEach(curFile=>{
  const curRouter = require(`./serverRoutes/${curFile}`);
  routersArr.push(curRouter);
})

app.use(...routersArr);
/*  const registerSimpleRouter = require('./serverRoutes/simple');
const registerBaseRouter = require('./serverRoutes/base');
const registerErrorRouter = require('./serverRoutes/error');
const registerExtendRouter = require('./serverRoutes/extend');
const interceptorRouter = require('./serverRoutes/interceptor');
const registerConfigHeaderRouter = require('./serverRoutes/config');
const registerTransformRouter = require('./serverRoutes/transform');

app.use(
  registerSimpleRouter,
  registerBaseRouter,
  registerErrorRouter,
  registerExtendRouter,
  interceptorRouter,
  registerConfigHeaderRouter,
  registerTransformRouter
); */ 
const PORT = process.env.PORT || 8202;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
module.exports = app;
