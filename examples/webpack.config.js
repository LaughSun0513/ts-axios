const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

//遍历目录，形成多入口对象
const reduceDir = (__dirname)=>{
  let dirArr = fs.readdirSync(__dirname);
  return dirArr.reduce((entries,dir)=>{
    const fullDir = path.join(__dirname,dir);
    const entry = path.join(fullDir,'app.ts');
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    console.log('entries===>'+JSON.stringify(entries))
    return entries
  },{})
}
module.exports = {
  mode:"development",
  entry:reduceDir(__dirname),
  output:{
    path:path.join(__dirname,"__build__"),//打包目录
    filename:"[name].js",
    publicPath:"/__build__/"
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        use:['tslint-loader'],
        enforce:"pre"
      },
      {
        test:/\.tsx?$/,
        use:[
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true 
            }
          }
        ]
        
      }
      
    ]
  },
  resolve:{
    extensions:['.ts','.tsx','.js']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),//热替换
    new webpack.NoEmitOnErrorsPlugin() // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
  ]
}