const path = require('path');
const ROOT = process.cwd(); // 根目录
const ENV = process.env.NODE_ENV;
const IsDev = (ENV === 'dev') ? true : false;
const glob = require('glob');

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		let basename = path.basename(entry, path.extname(entry)),
			pathname = path.dirname(entry);
		// js/lib/*.js 不作为入口
		if(!entry.match(/\/js\/lib\//)) {
			entries[pathname.split('/').splice(3).join('/') + basename] = pathname + '/' + basename;
		}
	});
	return entries;
}

/**
 * 根据目录获取 Html 入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntryHtml(globPath) {
	let entries = [];
	glob.sync(globPath).forEach(function(entry) {
		let basename = path.basename(entry, path.extname(entry)),
			pathname = path.dirname(entry),
			// @see https://github.com/kangax/html-minifier#options-quick-reference
			minifyConfig = IsDev ? '' : {
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true, //删除空白符与换行符
				minifyCSS: true,
				minifyJS: true
			};

		//console.log(pathname.split('/').splice(3).join('/') + '/' + basename);

		entries.push({
			filename: entry.split('/').splice(2).join('/'), //html页面   === index.html
			template: entry, //html模板路径    === ./src/index.html
			inject: true, //允许插件修改哪些内容，包括head与body
			hash: false, //是否添加hash值
			chunks: ['common', pathname.split('/').splice(3).join('/') + basename], //  === index
			minify: minifyConfig
		});

	});
	return entries;
}

module.exports = {
	getEntry: getEntry,
	getEntryHtml: getEntryHtml
};