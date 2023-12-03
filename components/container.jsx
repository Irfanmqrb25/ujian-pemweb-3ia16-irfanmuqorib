import React from 'react'

const Container = ({ children }) => {
    return (
        <div className='pt-20 pb-10 mx-4 md:pt-32 xl:pt-40 md:mx-10 lg:mx-20 lg:pb-20'>
            {children}
        </div>
    )
}

export default Container