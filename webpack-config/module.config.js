const path = require('path');
const ROOT = process.cwd(); // 根目录   /webpack-website
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const srcDir = ROOT + "/src";

module.exports = {
	rules: [{
			test: /\.(less|css)$/,
			use: ExtractTextPlugin.extract({
				use: [{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
					},
				],
				fallback: 'style-loader',
			}),
		},
		{
			test: /\.js$/,
			include: srcDir,
			loader: 'babel-loader',
			options: {
				presets: [
					['es2015', {
						loose: true
					}]
				],
				cacheDirectory: true,
				plugins: ['transform-runtime'],
			},
		},
		{
			// 图片加载器，可以将较小的图片转成base64，减少http请求  
			// 如下配置，将小于30720byte的图片转成base64码
			// 只针对样式背景图片
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 30720, //将小于30720byte图片转base64。设置图片大小，小于此数则转换
					publicPath: '',
					name: 'assets/img/[name].[ext]?[hash:8]' //输出目录以及名称
				}
			}]
		},
		{
			//加载字体文件图标
			test: /\.(woff|ttf|eot|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					publicPath: '',
					name: 'font/[name].[ext]?[hash:8]' //这里打包会生成一个在dist or build 下的 font/
				}
			}]
		},
		{
			test: /\.html$/,
			include: srcDir,
			loader: 'html-loader',
		},
	]
};