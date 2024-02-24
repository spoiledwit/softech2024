import Sidebar from '@/components/business/sidebar/Sidebar'
import useAuthStore from '@/store/authStore'
import React from 'react'
import { Outlet, redirect } from 'react-router-dom'

const BusinessLayout = () => {
    const { user } = useAuthStore();
    console.log(user);

    if (user?.businessId == null) {
        window.location.href = '/';
    }

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