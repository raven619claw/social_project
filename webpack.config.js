require('babel-polyfill');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    devtool: 'inline-source-map',
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
        extractSass,
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/to/directory/
            { from: './src/public/images', to: './dev/public/images' },
        ], {
            ignore: [],

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    ]
}
