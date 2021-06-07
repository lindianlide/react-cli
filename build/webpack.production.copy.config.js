
const merge = require('webpack-merge')
const prdConfig = require('./webpack.production.config.js')
const FileManagerPlugin = require('filemanager-webpack-plugin')
let destPath = ''

const copyFileArr = [
    { source: './dist/js/*.js', destination: `${destPath}/js` },
    { source: './dist/css/*.css', destination: `${destPath}/css` },
    { source: './dist/images/', destination: `${destPath}/images` }
]

module.exports = merge(prdConfig, {
    plugins: [
        new FileManagerPlugin({
            onStart: [
                {
                    delete: [`${destPath}/*`, `./dist/*`]
                }
            ],
            onEnd: [
                {
                    copy: copyFileArr
                }
            ]
        })
    ]
})
