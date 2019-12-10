const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLPlugins = []
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConf = require('./webpack.base.config')
const projectConf = require('./project.config')

projectConf.HTMLPlugins.forEach((HTMLPlugin) => {
    // 生产html文件.
    HTMLPlugins.push(
        new HtmlWebpackPlugin({
            ...HTMLPlugin,
            minify: {
                removeComments: true,
                // collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                // minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    )
})

const conf = merge(baseConf, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true
                    }
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
                // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
                // Enable file caching
                cache: true,
                parallel: true
            })
        ]
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        // splitChunks: {
        //     chunks: 'all',
        //     name: false
        // },
        // // Keep the runtime chunk separated to enable long term caching
        // // https://twitter.com/wSokra/status/969679223278505985
        // runtimeChunk: true
    },
    plugins: [
        new webpack.DefinePlugin({
            SELF_ENV: JSON.stringify(process.env.SELF_ENV)
        }),
        new ManifestPlugin(),
        //清除dist目录
        // new CleanWebpackPlugin(['dist']),//******DO NOT MODIFY!!!!!
        new CleanWebpackPlugin(),
        ...HTMLPlugins,
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        //分离css样式
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].min.css'
            // chunkFilename: "css/[id].[hash:8].css"
        }),
        //压缩css样式
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
                map: { inline: false },
                autoprefixer: { remove: false } //防止删除厂商前缀
            }
        })
        // new BundleAnalyzerPlugin(),
        // service worker
        // new WorkboxPlugin.InjectManifest({
        //   swSrc: resolve('./src/assets/container/sw.container'),
        //   importWorkboxFrom: 'local'
        // })
    ]
})

module.exports = conf
