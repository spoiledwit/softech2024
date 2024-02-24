import Sidebar from '@/components/business/sidebar/Sidebar'
import useAuthStore from '@/store/authStore'
import { Outlet } from 'react-router-dom'

const BusinessLayout = () => {
    const { user } = useAuthStore();

    if (user?.businessId == null) {
        window.location.href = '/';
    }

    return (
        <>
            <div className='flex flex-row pt-16'>
                <Sidebar />
                <div className='px-10 py-5 w-full'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default BusinessLayout