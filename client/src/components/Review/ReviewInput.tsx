import { ForumType, ReplyType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { BiMessageSquare, BiMessage, BiLike } from 'react-icons/bi'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
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

const formSchema = z.object({
    content: z.string().min(8),
});

const ReviewInput = () => {
    const [forum, setForum] = useState<ForumType>();
    const { user } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (!user) {
            toast({
                title: "Please login to review",
                description: "You need to login to leave a review",
                variant: "destructive"
            })
            return;
        }

        try {
            setIsSubmitting(true);
            const { content } = values;
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/reply`, {
                content,
                userId: user._id,
                forumId: forum?._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (!res) {
                throw new Error("An error occurred");
            }
            console.log(res.data);

        } catch (error: any) {
            console.log(error);
            return;
        }
        finally {
            setIsSubmitting(false);
            form.reset();
        }
    }

    return (
        <>
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
                                            placeholder={user ? "Leave a review..." : "Please login to review"}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={user ? false : true} className='bg-transparent border border-primary hover:text-white hover:bg-primary text-primary mr-auto'>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>

            </div>
        </>
    )
}

export default ReviewInput