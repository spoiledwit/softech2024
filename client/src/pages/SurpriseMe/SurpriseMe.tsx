import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/store/authStore";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
    budget: z.number().min(3)
});

type FormValues = z.infer<typeof formSchema>;

const SurpriseMe = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuthStore();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            await axios.get(`${import.meta.env.VITE_BASE_URI}/item/surprise`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            ).then((res) => {
                console.log(res.data);
            })
            toast({
                title: "Registered as a travel agent!",
                description: "You have successfully registered as a travel agent",
            });
            window.location.replace('/panel');
        } catch (error: any) {
            if (error.response.data) {
                return toast({
                    title: "An error occurred",
                    // description: error.response.data,
                    variant: "destructive",
                });
            }
            toast({
                title: "An error occurred",
                description: "An error occurred while trying to login",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            < Form {...form}>
                <div className="flex flex-col w-full h-screen items-center mt-40  ">
                    <div className="p-10 rounded-lg bg-white shadow-sm ">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-[700px] space-y-5 max-h-[900px]"
                        >
                            <div className="mb-6 w-full space-y-2">
                                <h1 className="text-center font-semibold text-4xl text-black ">
                                    Don't know where to go?
                                </h1>
                                <p className="text-center text-gray-500 text-lg">
                                    Let us surprise you with a location that fits your budget!
                                </p>
                            </div>
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="budget"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Budget</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={loading} className="w-full" type="submit">
                                {loading ? <div className="dotFlashing"></div> : <p>Surprise me!</p>}
                            </Button>
                        </form>
                    </div>
                </div>
            </Form >
        </>
    );
};

export default SurpriseMe;
