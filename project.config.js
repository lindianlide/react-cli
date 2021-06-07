module.exports = {
    entries: [
        {
            htmlName: 'cli', // 必填，页面入口文件
            htmlTitle: 'cli',
        }
    ],

    // 项目级别配置，配置项会被页面级别覆盖
    project: {
        vendorConfig: {
            customLoading: true // 自定义loading
        },
    }
}
