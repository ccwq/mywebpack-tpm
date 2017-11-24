var base  = require("./base");
var webpack = require("webpack");
var merge = require("webpack-merge");
var Wds = require("webpack-dev-server");
var Q = require("q");
var opn = require('opn');
var util = require("./util");
var baseCfg = base.webpack;

var devCfg = {
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
};

var config = merge(baseCfg,devCfg);


//
for(var k in config.entry) {
    var thunk = config.entry[k];
    thunk.unshift("webpack-dev-server/client?http://" + util.pkg.host + ":" + util.pkg.port);

    /**
     * webpack-dev-server 传入初始化参数 hot:true的时候，需要本行才能hmr
     */
    thunk.unshift("webpack/hot/dev-server");
}




var compiler = webpack(config);

var server = new Wds(compiler,{

    //没搞懂，为什么加了hot就不会自动刷新了
    hot:true,

    inline:true,
    compress: false,
    historyApiFallback: true,

    /**
     * 貌似是一个无效的设置。无论用什么地址，都可以预览
     */
    contentBase:util.distPath + "asdfadsf"
});

server.listen(util.pkg.port,util.pkg.host,function(){
    //打开网页
    console.log("dev server is started");
    opn(util.serverUrl);
})

