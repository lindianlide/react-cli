import React, { useState, useEffect, useRef, FC } from 'react'

import { HmsObject } from '@/typing'
interface CountDownProps {
    data: HmsObject
    timeClassName?: string
    timeItemClass?: string
    stopCallback?: () => void
}
const CountDown: FC<CountDownProps> = (props) => {
    const {
        data: { hours = 0, minutes = 0, seconds = 0 } = {},
        timeClassName = '',
        timeItemClass = '',
        stopCallback
    } = props
    const [over, setOver] = useState<boolean>(false)
    const [time, setTime] = useState<HmsObject>({
        hours,
        minutes,
        seconds
    })
    const savedCallback = useRef<() => void>()

    const tick = () => {
        if (over) return
        if (time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0) {
            setOver(true)
            typeof stopCallback === 'function' && stopCallback()
        } else if (time.minutes === 0 && time.seconds === 0) {
            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            })
        } else if (time.seconds === 0) {
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            })
        } else {
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            })
        }
    }

    useEffect(() => {
        setTime(props.data)
        setOver(false)
    }, [props.data])

    // 每次渲染后，保存新的回调到ref里
    savedCallback.current = tick

    useEffect(() => {
        function callback() {
            if (savedCallback.current) {
                savedCallback.current()
            }
        }
        const timer = setInterval(callback, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const formatDateNum = (num: number): string => {
        return num.toString().padStart(2, '0')
    }

    return (
        <div className={timeClassName}>
            <span className={timeItemClass}>{formatDateNum(time.hours)}</span>
            <i>:</i>
            <span className={timeItemClass}>{formatDateNum(time.minutes)}</span>
            <i>:</i>
            <span className={timeItemClass}>{formatDateNum(time.seconds)}</span>
            {props.children}
        </div>
    )
}

export default CountDown
