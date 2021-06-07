import React, { FC, useMemo, useEffect, useState } from 'react'
import { replaceUimgParam } from '@/utils/utils'

const OverPage: FC<Props> = function (config: Config) {
    const { pageName, pageTopPicUrl = '' } = config
    const [time, setTime] = useState(3)

    const url = useMemo(() => replaceUimgParam(pageTopPicUrl, 2), [pageTopPicUrl])
    const gotoHome = () => {
    }
    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else {
            gotoHome()
        }
    }, [time])


    return (
        <section className='main-over'>
            <span className='over-tip'>活动已结束~</span>
            <span className='over-button' onClick={gotoHome}>
                去转转 ({time}S)
            </span>
        </section>
    )
}

export default OverPage
