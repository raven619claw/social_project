require('babel-polyfill');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "./styles/css/[name].css",
    disable: false
});

module.exports = {
    entry: {
        signup: "./src/public/scripts/signup.js",
        main:"./src/public/styles/scss/main.scss",
        home:"./src/public/styles/scss/home.scss"
    },
    output: {
        path: path.join(__dirname, "dev/public"),
        filename: "./scripts/bundles/[name].js"
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.marko']
    },
    module: {
        rules: [{
            test: /\.marko$/,
            loader: 'marko-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules',
            query: {
                // https://github.com/babel/babel-loader#options
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
