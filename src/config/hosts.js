let customHosts = {}
switch ($.base.getEnvName()) {
    case 'DEV':
        customHosts.imageDomain = '/images/'
        break
    case 'PRD':
        customHosts.imageDomain = window.resRoot + '/m/images/'
        break
    default:
        customHosts.imageDomain = window.resRoot + '/m/images/'
        break
}

Object.assign(hosts, customHosts)

export default hosts
