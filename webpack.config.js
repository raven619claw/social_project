require('babel-polyfill');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "./dev/public/styles/css/[name].css",
    disable: false
});

const jsToBundle = require('./src/services/toBundleFiles.js')();

module.exports = {
    entry: jsToBundle,
    output: {
        path: __dirname,
        filename: "./dev/public/scripts/bundles/[name].js"
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.marko']
    },
    module: {
        loaders: [{
            test: /\.marko$/,
            loader: 'marko-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: ["./src/public/styles/scss"]
                    }
                }]
            })
        }]
    },
    plugins: [
        extractSass
    ]
}
