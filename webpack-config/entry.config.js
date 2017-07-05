const {getEntry} = require('./utils.config.js'); //引入工具模块


module.exports = getEntry('./src/js/**/*.js');


//module.exports = {
//  index: './src/js/index.js', 
//  list: './src/js/list.js',
//  about: './src/js/about.js'
//}
