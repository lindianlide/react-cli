/// <reference types="react-scripts" />
/// <reference types="suning-mem-definitions" />

/* 允许在ts中使用import styles from '*.less' */

declare module '*.less' {
    const styles: any

    export = styles
}

declare interface Window {
    __INITIAL_STATE__: Record<string, any>
    TimeList: Record<string, any> | undefined
    wx: Record<string, any> | undefined
    passport_config: { base: string; loginTheme: string }
    mLogger: Record<string, any>
    SnCaptcha: Record<string, any>
}
