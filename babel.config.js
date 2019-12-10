// 软件库/工具,可以使用 babel-runtime 插件
// 应用级别的开发可以考虑使用 babel-polyfill：大而全，支持所有的 es2015+ 特性，是对全局范围造成污染的。
module.exports = function(api) {
    api.cache(false)
    // 预设配置； 按照倒序的顺序执行； 是某一类 plugin 的集合，包含了某一类插件的所有功能。
    const presets = [
        [
            // 根据开发者的配置，按需加载插件,主要将es6+  -> es5;
            // 默认与babel-preset-latest 是等同的，会加载从es2015开始的所有preset。
            "@babel/preset-env", 
            {
                targets: {
                    chrome: "67",
                },
                useBuiltIns: "usage",
            },
        ], 
        '@babel/preset-react'
    ]
    // 插件配置； 将某一种需要转化的代码，转为浏览器可以执行代码； 所有plugins的插件执行完成，再执行 presets 预设。
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-regenerator'] //for async await
    ]

    return {
        presets,
        plugins
    }
}
