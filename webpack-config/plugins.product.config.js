var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝

//非覆盖式更新 解决缓存
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = [
	new webpack.ProvidePlugin({ //全局配置加载
     $: "jquery",
     jQuery: "jquery",
     "window.jQuery": "jquery"
  }),
  
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
    minChunks: Infinity // 提取至少3个模块共有的部分
  }),

  new ExtractTextPlugin( "css/[name].[chunkhash].css"), //提取CSS行内样式，转化为link引入

  new webpack.optimize.UglifyJsPlugin({ // js压缩
    compress: {
      warnings: false
    }
  }),

  new CopyWebpackPlugin([
        {from: './src/images', to: 'images'}, //拷贝图片
        {from: './src/less/absolute', to: './css/absolute'}, //拷贝图片
        {from: './src/less/slice', to: './css/slice'}, //拷贝图片
        {from: './src/less/font', to: './css/font'} //拷贝字体
  ]),
  
  //非覆盖式更新 解决缓存 S
  //js更改才会更改html,css;所以可以在js中定义一个version=0.0.1,
  //每次更改都修改version,达到修改其他的目的
  new WebpackMd5Hash(),
  new ManifestPlugin(),
  new ChunkManifestPlugin({
    filename: "chunk-manifest.json",
    manifestVariable: "webpackManifest"
  }),
  new webpack.optimize.OccurenceOrderPlugin()
  //非覆盖式更新 解决缓存 E
];
