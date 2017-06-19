var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器
var CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝


var config = {
    entry: require('./webpack-config/entry.config.js'),
    output: require('./webpack-config/output.config.js'),
    resolve:require('./webpack-config/resolve.config.js'),
    module: require('./webpack-config/module.sprite.config.js'),
    plugins: [
        new webpack.ProvidePlugin({ //全局配置加载
           $: "jquery",
           jQuery: "jquery",
           "window.jQuery": "jquery"
        }),
        new CleanPlugin(['build']),// 清空dist文件夹
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
            minChunks: Infinity // 提取至少3个模块共有的部分
        }),
        new ExtractTextPlugin( "css/[name].css"), //提取CSS行内样式，转化为link引入
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
        ])
    ],
    externals: {
        $: 'jQuery'
    }
};

module.exports = config;

var pages = Object.keys(getEntry('./src/*.html'));


var confTitle = [ 
    {name: 'index', title: '首页标题'},
    {name: 'list', title: '列表标题'},
    {name: 'about', title: '关于我标题'}
]
//生成HTML模板
pages.forEach(function(pathname) {
    var itemName  = pathname.split('src/') //根据系统路径来取文件名，window下的做法'src\\',mac下'src/'其它系统另测
    //console.log(itemName);
    var conf = {
        filename: itemName[1] + '.html', //生成的html存放路径，相对于path
        template: pathname + '.html', //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    conf.chunks = ['common', itemName[1]]
    for (var i in confTitle) { 
        if (confTitle[i].name === itemName[1]) { 
            conf.title = confTitle[i].title
        }
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


//按文件名来获取入口文件（即需要生成的模板文件数量）
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[pathname] = './' + entry;
    }
    return entries;
}


