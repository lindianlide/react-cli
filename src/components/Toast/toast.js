import notification from './notification.js'
import './toast.less'

let notificationDOM
const notice = (type, content, duration = 3000, onClose) => {
    if (!notificationDOM) notificationDOM = notification
    return notificationDOM.addNotice({ type, content, duration, onClose })
}

export default {
    info(content, duration, onClose) {
        return notice('info', content, duration, onClose)
    },
    success(content, duration, onClose) {
        return notice('success', content, duration, onClose)
    },
    warning(content, duration, onClose) {
        return notice('warning', content, duration, onClose)
    },
    error(content, duration, onClose) {
        return notice('error', content, duration, onClose)
    }
}
