var webpack = require("webpack");
var merge = require("webpack-merge");
var base = require("./base");
var rm = require("rimraf");
var Q = require("q")
var chalk = require("chalk");
var util = require("./util");


var devCfg = {
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}

var config = merge(base.webpack,devCfg);



var stopChain = false;
Promise.resolve()
    .then(function(){
        return Q.nfcall(rm,util.distPath)
    })
    .catch(function(err){
        console.log(chalk.red("删除dist失败"));
    })
    .then(function(){
        var compiler = webpack(config);
        return Q.nfcall(Q.nbind(compiler.run,compiler));
    })
    .then(function(stats){
        console.log(chalk.bold.green("build complete!"));
        console.log(
            stats.toString({
                chunks:false,colors:true
            })
        );
    })
    .catch(function(err){
        console.log("build err:",err);
    })
;







