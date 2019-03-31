/**
 * @name Webpack config file
 * @description Configure how we want webpack to work.
 * @author Aaron Welsh
 */

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = require('./env.js');
module.exports = {
    mode: 'development',
    plugins: [
        new VueLoaderPlugin()
    ],
    entry: '../src/public/js/main.js',
    output: {
        filename: '../dist/js/bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", {
                                    targets: {
                                      "node": "current"
                                    }
                                  }
                            ]
                        ]
                    }
                },

            },
            {
                test: /\.vue$/,
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: {
                    loader: "vue-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ]
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    }
};