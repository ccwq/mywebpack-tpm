var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var util = require("./util");



var base = {};


base.webpack = {
    entry:{
        index:["./src/index.js"],
        "subpage":["./src/subpage.js"],
    },
    output:{
        path        :   util.distStaticPath,
        //publicPath  :   "",
        filename    :   '[name].[hash].js'
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(pug|jade)$/,
                use: ['pug-loader']
            }
        ]
    },
    plugins:[

        util.getHtmlWebpackPlugin({

            /**
             * 使用形如../index.html的地址，在执行dev时候，会导致hrm失效。无解
             * */
            filename:"index.html"
        }),

        util.getHtmlWebpackPlugin({
            chunks:["subpage"],
            filename:"subpage.html"

        })
    ]
};




module.exports = base;