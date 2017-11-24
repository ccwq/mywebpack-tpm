var merge = require("webpack-merge");
var pkg = require("../package.json").webpackCfg;
var path = require("path");
var rootPath = path.resolve(__dirname,"../");
var HtmlWebpackPlugin = require('html-webpack-plugin');


var util = {};


util.rootPath        =       rootPath;
util.distPath        =       path.resolve(rootPath,          pkg.distDirName);
util.distStaticPath  =       path.resolve(util.distPath,      pkg.staticDirName);
util.srcPath         =       path.resolve(rootPath,          "src");
util.pkg             =       pkg;

util.serverUrl       =       "http://" + pkg.host + ":" + pkg.port;


util.getHtmlWebpackPlugin = function(config){
    var config = merge(
        {
            opt:util,
            chunks:["index"],
            inject:false,
            template: path.resolve(util.rootPath,'src/index.pug')
        },
        config
    )
    return new HtmlWebpackPlugin(config)
}


module.exports      =        util;