const path = require('path');
const webpack = require('webpack');
const ROOT = process.cwd(); // 根目录   /webpack-website
const srcDir = ROOT + "/src";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
const CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const {
	getEntryHtml
} = require('./utils.config.js'); //引入工具模块

//非覆盖式更新 解决缓存
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

let entryHtml = getEntryHtml('./src/*.html'),
	configPlugins = [
		/* 全局模块*/
		//如果习惯了使用全局模块，例如 jQuery 的 $，而不想每次都写 $ =  require('jquery')， 
		//可以使用  ProvidePlugin 插件
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery',
		}),

		/* 抽取出所有通用的部分 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
			minChunks: Infinity // 提取至少3个模块共有的部分
		}),

		/* 抽取出chunk的css */
		new ExtractTextPlugin("assets/[name].[chunkhash].css"), //提取CSS行内样式，转化为link引入

		/*js压缩*/
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		new CopyWebpackPlugin([
			{from: './src/assets/font',to: './assets/font'}, //拷贝字体
	        {from: './src/assets/img', to: './assets/img'}, //拷贝图片  
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
		new webpack.optimize.OccurrenceOrderPlugin(), //OccurrenceOrderPlugin webpack2 has renamed

		//非覆盖式更新 解决缓存 E
		
		//清除moudle.config 产生的font/
		new CleanPlugin(['build/font']),// 清空dist文件夹
		
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function postcss() {
					return [precss, autoprefixer({
						remove: false,
						browsers: ['ie >= 8', '> 1% in CN'],
					})];
				}
			}
		})
	];

// html
entryHtml.forEach(function(v) {
	configPlugins.push(new HtmlWebpackPlugin(v));
});

module.exports = configPlugins;