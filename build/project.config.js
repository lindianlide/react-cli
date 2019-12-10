
const path = require('path')
const fs = require('fs')
const url = require('url')
const resolve = p => path.resolve(p)
const userConfig = require('../project.config')
const appBody = require('self-tools/template/body')
const appHeader = require('self-tools/template/header')

let entry = {}
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = []
// 生成多页面的集合
if (!userConfig) throw new Error('请配置项目根目录project.config.container')
if (!userConfig.entries) throw new Error('请配置页面入口,entries')
if (!userConfig.appCode) throw new Error('请配置页面appCode')
if (
    !userConfig.dbp ||
    !Object.keys(userConfig.dbp).length ||
    !userConfig.dbp.pgcate ||
    !userConfig.dbp.tag
)
    throw new Error('请配置埋点参数,dbp')

let dbpInputArr = []

userConfig.entries.forEach(page => {
    switch (typeof page) {
        case 'string':
            dbpInputArr = [
                `<input type="hidden" id="pagename" value="pgcate=${userConfig.dbp.pgcate};
                tag=${userConfig.dbp.tag};pgtitle=${page}">`
            ]
        
            HTMLPlugins.push({
                template: resolve(`src/views/${page}/index.html`),
                inject: true,
                filename: `${page}.html`,
                chunks: [page],
                htmlTitle: page,
                dbpInputArr: dbpInputArr.join('\n'),
                appHeader: appHeader.join('\n'),
                appScript: appBody.join('\n').replace(/XAppCodeX/g, userConfig.appCode),
                appCode: userConfig.appCode
            })
            entry[page] = ['@babel/polyfill', resolve(`src/views/${page}`)]
            break
        case 'object':
            dbpInputArr = [
                `<input type="hidden" id="pagename" value="pgcate=${userConfig.dbp.pgcate};
                tag=${userConfig.dbp.tag};pgtitle=${page.dbpPgTitle || page.htmlTitle || 'react-cli'}">`
            ]
            HTMLPlugins.push({
                template: resolve(`src/views/${page.htmlName}/index.html`),
                inject: true,
                filename: `${page.htmlName}.html`,
                chunks: [page.htmlName],
                htmlTitle: page.htmlTitle || 'react-cli',
                dbpInputArr: dbpInputArr.join('\n'),
                appHeader: appHeader.join('\n'),
                appScript: appBody.join('\n').replace(/XAppCodeX/g, userConfig.appCode),
                appCode: userConfig.appCode
            })
            // babel-folyfill 是修改全局的对象的原型，添加不兼容的 api 方法，或者修改不兼容的 api 方法。
            entry[page.htmlName] = ['@babel/polyfill', resolve(`src/views/${page.htmlName}`)]

            break
        default:
            throw new Error('无效的入口类型。')
            break
    }
})

const conf = {
    srcPath: resolve('src'),
    buildPath: resolve('dist'),
    rootPath: '/',
    entry,
    HTMLPlugins,
    appNodeModules: resolve('node_modules')
}

module.exports = conf
