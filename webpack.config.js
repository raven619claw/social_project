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
        loaders: [
            {
                test: /\.marko$/,
                loader: 'marko-loader'
            }
        ]
    }
}