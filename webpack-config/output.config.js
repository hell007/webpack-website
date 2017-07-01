const path = require('path');
const ROOT = process.cwd(); // 根目录
const ENV = process.env.NODE_ENV;
const IsDev = (ENV === 'dev') ? true : false;

console.log(IsDev ? '===dev===' : '===product==');
module.exports = {
	path: path.join(__dirname, IsDev ? '../dist' : '../build'), //打包后生成的目录
	publicPath: '', //模板、样式、脚本、图片等资源对应的server上的路径chunkhash
	filename: IsDev ? 'js/[name].js' : 'js/[name].[chunkhash].js',
	chunkFilename: IsDev ? 'js/[name].js' : 'js/[name].[chunkhash].js'
};