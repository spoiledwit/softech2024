import { toReadableDate } from '@/lib/utils'
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
                        <p className='text-sm'>{toReadableDate(reply?.createdAt)}</p>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-row gap-2'>
                            <BiLike size={20} className='text-primary cursor-pointer' />
                            <p className='text-sm'>{reply.likes?.length}</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <BiDislike size={20} className='text-primary cursor-pointer' />
                            {/* @ts-ignore */}
                            <p className='text-sm'>{reply.disliks?.length}</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Reply