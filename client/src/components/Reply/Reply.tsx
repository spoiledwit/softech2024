import useAuthStore from '@/store/authStore'
import { ReplyType } from '@/types'
import React from 'react'
import { BiCalendar, BiDislike, BiLike, } from 'react-icons/bi'

const Reply = ({ reply }: { reply: ReplyType }) => {

    const { user } = useAuthStore();

    return (
        <>
            <div className='flex flex-row  rounded justify-between px-4 py-1 border w-full bg-primary bg-opacity-10'>
                <div className='mt-2'>
                    <p className='text-sm font-medium'>{user?.name}</p>
                    <p>{reply.content}</p>
                </div>
                <div className='w-fit flex flex-col gap-3 justify-center items-center py-3'>
                    <div className='flex flex-row gap-2'>
                        <BiCalendar size={22} className='text-primary' />
                        <p className='text-sm'>18-06-2002</p>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-row gap-2'>
                            <BiLike size={20} className='text-primary cursor-pointer' />
                            <p className='text-sm'>{reply.likes}</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <BiDislike size={20} className='text-primary cursor-pointer' />
                            <p className='text-sm'>{reply.dislikes}</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Reply