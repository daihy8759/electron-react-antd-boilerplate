const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: ['react-hot-loader/patch', './src/renderer/index.js'],
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, '../src/renderer')],
                use: ['react-hot-loader/webpack', 'babel-loader']
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new ESLintPlugin()],
    optimization: {
        moduleIds: 'named'
    },
    devServer: {
        port: 2003,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true,
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting main process');
                spawn('npm', ['run', 'start-main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                    .on('close', code => process.exit(code))
                    .on('error', spawnError => console.error(spawnError));
            }
        }
    }
});
