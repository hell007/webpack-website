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
        // 图片加载器，可以将较小的图片转成base64，减少http请求  
        // 如下配置，将小于30720byte的图片转成base64码
        // 只针对样式背景图片
        test: /\.(png|jpg|gif|svg)$/,   
        loader: 'url?limit=30720&name=./images/[name].[ext]'
        //loader: 'url',
        // query: {
        //     limit: 30720, //将小于30720byte图片转base64。设置图片大小，小于此数则转换。
        //     name: './images/[name].[ext]?' //输出目录以及名称
        // }
      }
    ]
};
