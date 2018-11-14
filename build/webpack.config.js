/**
 * @name Webpack config file
 * @description Configure how we want webpack to work.
 * @author Aaron Welsh
 */

const webpack = require('webpack');
const env = require('./env.js');
module.exports = {
    entry: '../src/public/js/main.js',
    output: {
        filename: '../dist/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    }
};
if (env.app.mode === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}