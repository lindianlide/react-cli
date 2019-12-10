let self_config = {}

//根据环境获取域名
switch ($.base.getEnvName()) {
    case 'PRD':
        self_config.loginDomain = '//image?.cn/uimg'.replace('?', Math.round(Math.random() * 4 + 1))
        break
    case 'DEV':
        self_config.loginDomain = '//image?.cn/uimg'.replace('?', Math.round(Math.random() * 4 + 1))
        break
    default:
        self_config.loginDomain = '//uimgsit.com/uimg'
}

let self_tool = {
    getUrlParams: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return decodeURIComponent(r[2])
        return null
    },
    goLogin: function() {
        window.location.href =
            self_config.idsauthServerUrl +
            '/ids/login?service=' +
            encodeURIComponent(self_config.loginDomain + '?targetUrl=' + encodeURIComponent(window.location.href)) +
            '&loginTheme=wap_new'
    },
    isShow: function() {
        var UA = window.navigator.userAgent
        window.device = {
            isAndroid: UA.match(/android/i) ? true : false,
            isIOS: UA.match(/(iPhone|iPod|iPad);?/i) ? true : false,
            isWX: UA.match(/MicroMessenger/i) ? true : false
        }
    }
}

export { self_config, self_tool }
