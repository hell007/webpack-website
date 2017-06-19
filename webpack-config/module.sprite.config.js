var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，

module.exports = {
  loaders: [ 
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query:{
          presets: ['es2015']
        }
      },
      {
        //加载字体文件  注意?t=0.0.1这里配置不对会出错
        //https://github.com/nicksrandall/base64-font-loader
        test: /\.(woff|ttf|eot|svg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&name=font/[name].[ext]'
        // loader: 'url',
        // query: {
        //  limit: 10000,
        //  name: 'font/[name].[ext]'
        // }
      },
      {
          test: /\.(png|jpg|gif)(\?v=[0-9])?$/,
          loader: 'file?name=slice/[name].[ext]?__sprite'
      }
    ]
};
