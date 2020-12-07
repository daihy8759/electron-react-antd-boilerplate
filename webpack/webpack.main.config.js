const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    target: 'electron-main',
    entry: {
        main: './src/main/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, '../src/main')],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
});
