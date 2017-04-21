var webpack = require('webpack');
module.exports = {
    entry: require('./public/pages.config.json'),
    cache: true,
    minimize: true,
    output: {
        path: __dirname + "/public/dist",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'latest',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                        'stage-3',
                    ]
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            io: 'socket.io-client'
        })
    ]
};
