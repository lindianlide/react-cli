
const restify = require('restify')
const modules = require('./data/modules.json')

const server = restify.createServer()
server.use(function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    return next()
})
server.get('/api/batch.do', (req, res, next) => {
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = req.getQuery().match(reg)
        if (r != null) return unescape(r[2])
        return null
    }
    const index = getQueryString('index')
    const count = getQueryString('count')
    //const resp = modules.data.slice((index - 1) * count, index * count)
    const resp = modules.data
    res.send({
        code: '1',
        data: resp,
        index: 1,
        total: 11,
        msg: '成功'
    })
    return next()
})


server.listen(8000, () => console.log('%s listening at %s', server.name, server.url))
