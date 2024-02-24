import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link, redirect } from "react-router-dom";
import { login } from "@/hooks/auth";
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

const formSchema = z.object({
    name: z.string().min(3)
});

type FormValues = z.infer<typeof formSchema>;

const BusinessForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            // const data = await login(values.email, values.password);
            // if (!data.user) {
            //     throw new Error("An error occurred");
            // }
            // setUser(data.user);
            // localStorage.setItem("token", data.token);
            toast({
                title: "Login successful",
                description: "You have successfully logged in",
            });
            redirect('/');
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
        <Form {...form}>
            <div className="flex flex-col w-full h-screen items-center justify-center border-black ">
                <div className="p-10 rounded-lg bg-white shadow-sm border">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-[400px] space-y-2 max-h-[900px]"
                    >
                        <div className="mb-6 w-full space-y-2">
                            <h1 className="text-center font-semibold text-3xl text-black ">
                                Become a Travel Agent
                            </h1>
                            <p className="text-center text-gray-500 text-sm">
                                Enter your business name below
                            </p>
                        </div>
                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} className="w-full" type="submit">
                            {loading ? <div className="dotFlashing"></div> : <p>Register</p>}
                        </Button>
                    </form>
                </div>
            </div>
        </Form>
    );
};

export default BusinessForm;
