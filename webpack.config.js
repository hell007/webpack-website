const IsDev = process.env.NODE_ENV === 'dev' ? true : false;
const plugins = IsDev ? require('./webpack-config/plugins.dev.config.js') : require('./webpack-config/plugins.product.config.js');

module.exports = {
	entry: require('./webpack-config/entry.config.js'),
	output: require('./webpack-config/output.config.js'),
	module: require('./webpack-config/module.config.js'),
	resolve: require('./webpack-config/resolve.config.js'),
	plugins: plugins,
	externals: require('./webpack-config/externals.config.js')
};
