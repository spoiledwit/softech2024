import { toReadableDate } from '@/lib/utils'
import useAuthStore from '@/store/authStore'
import { ReplyType, ReviewType } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiCalendar, BiDislike, BiLike, } from 'react-icons/bi'

const Review = ({ review }: { review: ReviewType }) => {

    const { user } = useAuthStore();

    return (
        <>
            <div className='flex flex-row  rounded justify-between px-4 py-1 w-full bg-primary bg-opacity-10'>
                <div className='mt-2'>
                    <p className='text-sm font-medium'>{user?.name}</p>
                    <p>{review.review}</p>
                </div>
                <div className='w-fit flex flex-col gap-3 justify-center items-center py-3'>
                    <div className='flex flex-row gap-2'>
                        <BiCalendar size={22} className='text-primary' />
                        <p className='text-sm'>{toReadableDate(review?.createdAt)}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Review