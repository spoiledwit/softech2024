import Sidebar from '@/components/business/sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const BusinessLayout = () => {
    return (
        <>
            <div className='flex flex-row'>
                <Sidebar />
                <div className='px-10 py-5 w-full'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default BusinessLayout