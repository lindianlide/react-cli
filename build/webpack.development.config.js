const path = require('path')
const webpack = require('webpack')
const baseConf = require('./webpack.base.config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils-for-webpack4/WatchMissingNodeModulesPlugin')
const projectConf = require('./project.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const userConfig = require('../project.config')
const HTMLPlugins = projectConf.HTMLPlugins.map((HTMLPlugin) => new HtmlWebpackPlugin({ ...HTMLPlugin }))

const conf = merge(baseConf, {
    devtool: 'cheap-module-source-map',
    devServer: {
        publicPath: '/',
        hot: true,
        port: 8888,
        disableHostCheck: true,
        // hotOnly: true,
        host: '0.0.0.0',
        overlay: true,
        proxy: {
            '/api/': {
                target: 'http://',
                changeOrigin: true
            }
        }
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            SELF_ENV: JSON.stringify(process.env.SELF_ENV)
        }),
        ...HTMLPlugins,
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new webpack.NamedModulesPlugin(),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[name].js.map'
        // }),
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

module.exports = new Promise((resolve, reject) => {
    const expectPort = 2333
    portfinder.basePort = expectPort
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            conf.devServer.port = port
            const messages = userConfig.entries.map((page, index) => {
                const isSampleConf = typeof page === 'string'
                const chunkName = isSampleConf ? page : page.htmlName
                return `Your page ${index +
                    1} is running here: http://localhost.com:${port}/${chunkName}.html?wx_navbar_transparent=true`
            })
            const ifPortOccupied = port !== expectPort
            ifPortOccupied && messages.unshift(`${expectPort} port has been Occupied, found ${port} instead`)
            conf.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages
                    },
                    onErrors: undefined
                })
            )
            resolve(conf)
        }
    })
})
