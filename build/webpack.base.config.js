const path = require('path')
const resolveModule = (relativePath) => relativePath
const resolve = (p) => path.resolve(p)
const webpack = require('webpack')
const parentModFilename = module.parent.filename.split(/\\|\//).pop()
const projectConf = require('./project.config')
const autoprefixer = require(resolveModule('autoprefixer'))
const postcssPx2rem = require(resolveModule('postcss-px2rem'))
const MiniCssExtractPlugin = require(resolveModule('mini-css-extract-plugin'))
const chalk = require(resolveModule('chalk'))
const pkg = require(resolve('package.json'))
const eslint = require('eslint')
console.log(chalk.cyan(`🤢 ${pkg.name} v${pkg.version} building...`))

for (let i = 0, il = projectConf.entry.length; i < il; i++) {
    console.log(chalk.cyan(`🤢 entry: ${projectConf.entry[i]}`))
}

module.exports = {
    context: resolve(''),
    entry: projectConf.entry,
    output: {
        path: projectConf.buildPath, // webpack的build路径 ,输出文件的保存路径
        filename: 'js/[name].min.js', // 输出文件的名称,
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '../'
        /**public-path-place-holder**/
    },
    // Don't attempt to continue if there are any errors.
    bail: true,
    module: {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            resolvePluginsRelativeTo: __dirname
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: path.resolve('./src')
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    /*
            小于limit（8192 byte）大小的图片会被压缩成base64，超过的按照file-loader方式处理
            如果有大量不重复小图会增加html体积 此处因替换成file-loader
           */
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: resolveModule('url-loader'),
                        options: {
                            limit: 8192,
                            name: 'image/[name].[hash:8].[ext]'
                        }
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs|ts|tsx)$/,
                        include: projectConf.srcPath,
                        loader: resolveModule('babel-loader'),
                        options: {
                            // customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            // plugins: [
                            //     [
                            //         require.resolve('babel-plugin-named-asset-import'),
                            //         {
                            //             loaderMap: {
                            //                 svg: {
                            //                     ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                            //                 }
                            //             }
                            //         }
                            //     ]
                            // ],
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true
                        }
                    },
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use a plugin to extract that CSS to a file, but
                    // in development "style" loader enables hot editing of CSS.
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: /development/.test(parentModFilename)
                                    ? resolveModule('style-loader')
                                    : MiniCssExtractPlugin.loader
                            },
                            {
                                loader: resolveModule('css-loader'),
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: resolveModule('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require(resolveModule('postcss-flexbugs-fixes')),
                                        autoprefixer(),
                                        postcssPx2rem({ remUnit: 50 })
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            {
                                loader: /development/.test(parentModFilename)
                                    ? resolveModule('style-loader')
                                    : MiniCssExtractPlugin.loader
                            },
                            {
                                loader: resolveModule('css-loader'),
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: resolveModule('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require(resolveModule('postcss-flexbugs-fixes')),
                                        autoprefixer(),
                                        postcssPx2rem({ remUnit: 50 })
                                    ]
                                }
                            },
                            {
                                loader: resolveModule('stylus-loader'),
                                options: {
                                    import: [
                                        // path.join(__dirname, "../src/assets/css/index.styl"),//变量文件
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: /development/.test(parentModFilename)
                                    ? resolveModule('style-loader')
                                    : MiniCssExtractPlugin.loader
                            },
                            {
                                loader: resolveModule('css-loader'),
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: resolveModule('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require(resolveModule('postcss-flexbugs-fixes')),
                                        autoprefixer(),
                                        postcssPx2rem({ remUnit: 50 })
                                    ]
                                }
                            },
                            {
                                loader: resolveModule('less-loader'),
                                options: {
                                    javascriptEnabled: true,
                                    css: true
                                }
                            }
                        ]
                    },
                    /**sass-place-holder**/
                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // its runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js)$/, /\.html$/, /\.json$/],
                        loader: resolveModule('file-loader'),
                        options: {
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false
    }
}
