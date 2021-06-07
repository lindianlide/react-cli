import React, { FC } from 'react'



export type Props = {
    isLogin: boolean
}

const IndexPage: FC<Props> = function (props: Props) {

    return (
        <>
            <section>
            </section>
        </>
    )
}

export default React.memo(IndexPage)
