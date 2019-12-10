const path = require('path')
const resolveModule = (relativePath) => path.resolve(relativePath)
const resolve = (p) => path.resolve(p)
const webpack = require('webpack')
const baseConf = require('./webpack.base.config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils-for-webpack4/WatchMissingNodeModulesPlugin')
const projectConf = require('./project.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const os = require('os')
const HTMLPlugins = []
projectConf.HTMLPlugins.forEach((HTMLPlugin) => {
    // 生产html文件.
    HTMLPlugins.push(new HtmlWebpackPlugin({ ...HTMLPlugin }))
})

const conf = merge(baseConf, {
    devtool: 'cheap-module-source-map',
    devServer: {
        publicPath: '/',
        hot: true,
        port: 3333,
        disableHostCheck: true,
        // hotOnly: true,
        host: '0.0.0.0',
        overlay: true,
        proxy: {
            '/api': {
                target: 'https://api.com/',
                pathRewrite: {},
                changeOrigin: true
            }
        }
    },
    mode: 'development',
    plugins: [
        // //清除dist目录
        // new CleanWebpackPlugin(['dist']), //******DO NOT MODIFY!!!!!
        new webpack.DefinePlugin({
            SELF_ENV: JSON.stringify(process.env.SELF_ENV)
        }),
        ...HTMLPlugins,

        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WatchMissingNodeModulesPlugin(projectConf.appNodeModules),
        //分离css样式
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        })
    ]
})
module.exports = conf
