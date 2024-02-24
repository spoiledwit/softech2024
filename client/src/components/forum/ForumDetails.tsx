import Reply from '@/components/Reply/Reply';
import { ForumType, ReplyType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { BiMessageSquare, BiMessage, BiLike } from 'react-icons/bi'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import useAuthStore from '@/store/authStore';
import { toReadableDate } from '@/lib/utils';

interface Props {
    params: {
        slug: string;
    }
}

const formSchema = z.object({
    content: z.string().min(8),
});

const page = ({ params }: Props) => {

    const [forum, setForum] = useState<ForumType>();
    const [replies, setReplies] = useState<ReplyType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const id = params.slug;
    const { toast } = useToast();

    async function getForum() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/forum/${id}`);
            if (!res.data) {
                console.log(res.data);
            }
            setForum(res.data.result);
            setReplies(res.data.result.replies);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (!user) {
            toast({
                title: "Please login to comment",
                description: "You need to login to leave a comment",
                variant: "destructive"
            })
            return;
        }

        try {
            setIsSubmitting(true);
            const { content } = values;
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}comment/${forum?._id}`, {
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (!res) {
                throw new Error("An error occurred");
            }
            getForum();

        } catch (error: any) {
            console.log(error);
            return;
        }
        finally {
            setIsSubmitting(false);
            form.reset();
        }
    }

    async function handleLike() {
        try {
            if (!user) {
                toast({
                    title: "Please login to like",
                    description: "You need to login to leave a like",
                    variant: "destructive"
                })
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/like/${forum?._id}`);
            if (!res.data) {
                console.log(res.data);
            }
            getForum();
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getForum();
    }, []);


    return (
        <>
            <div className='mt-32 px-32 '>
                <div className='flex flex-row  gap-2 items-baseline'>
                    {
                        isLoading ?
                            <>
                                <Skeleton className="h-[30px] w-[70px] rounded-md" />
                                <Skeleton className="h-[20px] w-[70px] rounded-md" />
                            </>
                            :
                            <>
                                <h1 className='text-3xl font-semibold'>{forum?.title}</h1>
                                <span className='text-md opacity-55 ml-2'>by <span className='font-medium'>{forum?.userId.name}</span></span>
                            </>
                    }
                </div>
                <div className='flex flex-row mt-2 justify-between w-fit gap-10'>
                    <div className='flex flex-row gap-2 items-baseline opacity-60'>
                        <p>
                            {
                                forum &&
                                toReadableDate(forum.createdAt)
                            }
                        </p>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <BiMessage size={20} className='text-primary' />
                            <p className='opacity-60'>{forum?.replyCount}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2' onClick={() => handleLike()}>
                            <BiLike size={20} className='text-primary' />
                            <p className='opacity-60'>{forum?.likes?.length}</p>
                        </div>
                    </div>
                </div>
                {
                    isLoading ?
                        <Skeleton className="h-[70px] mt-5 w-full rounded-md" />
                        :
                        <p className='mb-10 mt-5'>
                            {forum?.content}
                        </p>
                }
                <div>
                    <h2 className='text-xl font-semibold mt-8 border-b border-primary border-opacity-40 pb-4'>Comments</h2>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    disabled={user ? false : true}
                                                    placeholder={user ? "Leave a comment..." : "Please login to comment"}
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={user ? false : true} className='bg-transparent border border-primary hover:text-white hover:bg-primary text-primary mr-auto'>
                                    {isSubmitting ? "Submitting..." : "Comment"}
                                </Button>
                            </form>
                        </Form>

                    </div>

                    {
                        isLoading ?
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex flex-row justify-between items-center mt-5">
                                    <div className='flex flex-row gap-2 items-center'>
                                        <Skeleton className="h-[50px] w-[50px] rounded-xl" />
                                        <Skeleton className="h-[50px] w-[400px] rounded-xl" />
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <Skeleton className="h-[50px] w-[50px]" />
                                        <Skeleton className="h-[50px] w-[50px]" />
                                    </div>
                                </div>
                            ))

                            :
                            <div className='flex flex-col gap-4 mt-5'>
                                {
                                    replies?.map((reply) =>
                                        <Reply reply={reply} />
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default page