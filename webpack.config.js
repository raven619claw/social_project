require('babel-polyfill');

module.exports = {
    entry: "./src/public/scripts/signup.js",
    output: {
        path: __dirname,
        filename: "./dev/public/scripts/bundles/clientBundle.js"
    },
    devtool: 'eval-source-map',
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
                // https://github.com/babel/babel-loader#options
                cacheDirectory: true,
                presets: ['es2015', 'stage-2']
            }
        }]
    }
}
