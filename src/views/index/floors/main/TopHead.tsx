import React, { FC, useMemo, useContext } from 'react'
import { replaceUimgParam } from '@/utils/utils'

export type navConfig = {
    pageName: string
    pageTopPicUrl: string
    pagePicUrl?: string
}
const TopHead: FC<Props> = function (navConfig: navConfig) {
    const { pageName, pageTopPicUrl = '' } = navConfig

    const style = { backgroundImage: `url(${replaceUimgParam(pageTopPicUrl, 2)})` }

    return (
        <>
            <div className={`main-header fix-top`} style={style}>
                <div className='header-left'>
                    <a className='return-button back-icon'></a>
                </div>
                <div className='title'>{pageName}</div>
            </div>
            <div></div>
        </>
    )
}

export default TopHead
