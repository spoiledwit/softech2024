import { ForumType, ItemType, ReplyType } from '@/types';
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
    message: z.string().min(10),
});



const Complaint = ({ item }: { item: ItemType }) => {
    const { user } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (!user) {
            toast({
                title: "Please login to leave a query",
                description: "You need to login to leave a query",
                variant: "destructive"
            })
            return;
        }

        try {
            setIsSubmitting(true);
            const { message } = values;
            const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/item/review`, {
                message,
                itemId: item._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (!res) {
                throw new Error("An error occurred");
            }
            console.log(res.data);
            toast({
                title: "Added review",
                description: "Successfully added a review"
            })
            window.location.reload();

        } catch (error: any) {
            console.log(error);
            toast({
                title: "Error occurred",
                description: "An error occurred while submitting review",
                variant: "destructive"
            })
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
                <h3 className='font-semibold text-primary'>Got a complaint or query?</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-4">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={user ? false : true}
                                            placeholder={user ? "Leave a message..." : "Please login to submit a query"}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={user ? false : true} className='bg-transparent w-full border border-primary hover:text-white hover:bg-primary text-primary mr-auto'>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>

            </div>
        </>
    )
}

export default Complaint