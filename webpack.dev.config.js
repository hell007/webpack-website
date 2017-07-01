const path = require('path');
const webpack = require('webpack');
const ROOT = process.cwd(); // 根目录
//const ENV = process.env.NODE_ENV;
//const IsDev = (ENV === 'dev') ? true : false;

module.exports = {
	entry: require('./webpack-config/entry.config.js'),
	output: require('./webpack-config/output.config.js'),
	module: require('./webpack-config/module.config.js'),
	resolve: require('./webpack-config/resolve.config.js'),
	plugins: require('./webpack-config/plugins.dev.config.js'),
	externals: require('./webpack-config/externals.config.js'),
	devServer: {
		contentBase: [
			path.join(ROOT, 'src/')
		],
		host: 'localhost',
		port: 3000, // 默认3000
		inline: true, // 可以监控js变化
		hot: false, // 热启动
		compress: true,
		watchContentBase: false,
	}
};