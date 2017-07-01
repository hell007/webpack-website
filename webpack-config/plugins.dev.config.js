const path = require('path');
const webpack = require('webpack');
const ROOT = process.cwd(); // 根目录   /webpack-website
const srcDir = ROOT + "/src";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const {getEntryHtml} = require('./utils.config.js'); //引入工具模块


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

		/* 抽取出chunk的css*/
		new ExtractTextPlugin("assets/[name].css"), //提取CSS行内样式，转化为link引入
		
		
		new CopyWebpackPlugin([
			{from: './src/assets/font',to: './assets/font'}, //拷贝字体
	        {from: './src/assets/img', to: './assets/img'}, //拷贝图片  
		]),

		// 如果代码中有需要插入静态的全局变量，
		//或者需要根据环境变量来区分的分支，
		//可以使用 DefinePlugin 插件来插入静态环境变量，插入的变量在编译时将被处理
		//new webpack.DefinePlugin({
		//	"process.env": {
		//      NODE_ENV: JSON.stringify( options.dev ? 'development' : 'production' )
		//    },
		//    "__SERVER__": isServer ? true : false
		//}),

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