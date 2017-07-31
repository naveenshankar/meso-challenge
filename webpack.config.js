var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEST_DIR = path.resolve(__dirname, "public");
var STATIC_DIR = path.resolve(__dirname, "static");
var SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
    entry: SRC_DIR + "/index.js",
    output: {
        path: DEST_DIR,
        filename: "bundle.js",
        resolve: {
        extensions: ['', '.js', '.jsx']
      }
    }, 
    module: {
        loaders: [
            {
              test: /\.js?$/, 
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                  presets: ['react','es2015','stage-1','stage-2'],
                  "plugins": ['transform-runtime',
                              'transform-regenerator'
                              ],
                }
            },
            { test: /\.png$/, loader: "file-loader" },
            { test: /\.gif$/, loader: "file-loader" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=100000000000" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000000000" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css!sass') },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
              new ExtractTextPlugin("client_styles.css")
    ],
    node: {
        fs: 'empty',
        child_process: 'empty'
    }
};
