/**
 * Radio 单选框
 * @example
 *
 */
import React, { FC, useState } from 'react'
import './assets/index.less'

interface RadioProps {
    /** 是否选中 */
    isChecked: boolean
    /** 顶层元素类名 */
    classes?: string
    /** 监听改变触发的回调 */
    onChange?: (boolean, e: React.MouseEvent<HTMLElement>) => void
    /** 是否禁止选择 */
    disabled?: boolean
}

const Checkbox: FC<RadioProps> = (props) => {
    const { disabled, onChange, classes } = props
    const [isChecked, setCheckedState] = useState(props.isChecked)

    const handleInputChange = (event) => {
        if (event.nativeEvent.defaultPrevented) {
            return
        }

        const newChecked = !isChecked
        setCheckedState(newChecked)

        if (onChange) {
            onChange(newChecked, event)
        }
    }

    return (
        <label className={'checkbox-button-wrapper ' + classes}>
            <input
                className='checkbox-button'
                type='checkbox'
                name='checkbox-button'
                checked={isChecked}
                disabled={disabled}
                onChange={handleInputChange}
            />
            <span className='checkbox-button-icon' sa-data={props['sa-data'] || ''} />
        </label>
    )
}

Checkbox.defaultProps = {
    isChecked: false,
    disabled: false
}

export default Checkbox
