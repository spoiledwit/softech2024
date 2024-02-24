import { zodResolver } from "@hookform/resolvers/zod";
import PhotosUploader from "@/components/Uploaders/PhotoUploader";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { login } from "@/hooks/auth";
import { useNavigate } from "react-router-dom";
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
import Locator from "@/components/Locator/Locator";
import { categories } from "@/constants";
import { DatePickerWithRange } from "@/components/DatePicker/DatePicker";

const formSchema = z.object({
    title: z.string().min(6),
    category: z.string(),
    images: z.array(z.string()).nonempty(),
    videos: z.array(z.string()),
    location: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
    }),
    price: z.number(),
    availableDates: z.object({
        allAvailable: z.boolean(),
        dates: z.array(z.string()),
    }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateItem = () => {

    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();
    let count = 0;
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        console.log(images);
    }, [images]);

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
            navigate("/");
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
            <div className="flex flex-col w-full h-screen mt-16 items-center border-black ">
                <div className="p-10 rounded-lg bg-white shadow-sm border">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-[800px] space-y-2 max-h-[900px]"
                    >
                        <div className="mb-6 w-full space-y-2">
                            <h1 className="text-center font-semibold text-3xl text-black ">
                                Create a new item
                            </h1>
                            <p className="text-center text-gray-500 text-sm">
                                Enter your item details below
                            </p>
                        </div>
                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="title"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                categories.map((cat) => (
                                                    <SelectItem value={cat.value}>{cat.title}</SelectItem>
                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="price"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DatePickerWithRange date={date} setDate={setDate} key={1} />
                        <PhotosUploader addedPhotos={images} maxPhotos={3} onChange={() => setImages} key={++count} />
                        <div>
                            {/* <Locator /> */}
                        </div>
                        <Button disabled={loading} className="w-full" type="submit">
                            {loading ? <div className="dotFlashing"></div> : <p>Submit</p>}
                        </Button>
                    </form>
                </div>
            </div>
        </Form>
    );
};

export default CreateItem;
