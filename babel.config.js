//project-wide config
module.exports = function (api) {
    api.cache(false)
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                loose: true
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ]
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        // '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-flow-strip-types',
        '@babel/plugin-transform-regenerator',
        //['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-transform-runtime', { corejs: 3 }],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator'
    ]

    return {
        presets,
        plugins
    }
}
