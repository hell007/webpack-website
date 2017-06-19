var path = require('path');

module.exports = {
	path: path.join(__dirname, '../build'), //打包后生成的目录
	publicPath: '',	//模板、样式、脚本、图片等资源对应的server上的路径
	filename: 'js/[name].[chunkhash].js',
	chunkFilename: 'js/[name].[chunkhash].js'
};
