const webpack = require('webpack');
const path = require('path');
module.exports = {
  mode:"development",
  entry:path.resolve(__dirname,'./simple/app.ts'),
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
              //不加这个选项的话，它会把转义的结果写入到文件中
              //在内存中由webpack来处理,让后续loader处理ts-loader的结果
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