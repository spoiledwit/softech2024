import SolidCard from "@/components/Cards/SolidCard";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const BusinessDashboard = () => {

    const { user } = useAuthStore();
    const [complaintCount, setComplaintCount] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);
    const [items, setItems] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getItemAnalytics() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/analytics/${user?.businessId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            setItemCount(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getItems() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/business/${user?.businessId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            setItems(res.data);
            let arr = res.data;
            await arr.forEach(item => {
                items?.push({
                    itemName: item?.title,
                    count: item?.reviews?.length
                })
            });
            console.log(items);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function getOrders() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/complaint/analytics/${user?.businessId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            setComplaintCount(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        getItemAnalytics();
        getItems();
        getOrders();

    }, [])
    if (loading == false && items.length == 0) {
        console.log("no items");
        return 1;
    }

    return (
        <div className="min-h-screen  dark:bg-white bg-opacity-30 pb-16">
            <div className="flex justify-center ">
                <div className="w-full py-10 px-5 flex flex-col gap-8">
                    <div className="w-full flex flex-row justify-between gap-5 border bg-white rounded-lg p-5 shadow-xl">
                        <div>

                            <LineChart
                                width={500}
                                height={300}
                                data={items}
                                className="mt-5"
                            >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="itemName" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#EAB308" strokeWidth={2} dot={false} />
                            </LineChart>
                        </div>
                        <div className="w-1/3 flex flex-col justify-between">
                            <div>
                                <p className="text-2xl font-semibold">Total Reviews</p>
                                <p className=" opacity-50 mt-3">Total amount reviews this month by all the users</p>
                                <div className="flex flex-col mt-2 opacity-80 ">
                                </div>
                            </div>
                            <Button className="bg-primary text-white dark:text-white dark:hover:bg-hover dark:bg-primary hover:bg-hover mb-6">View Deposits</Button>
                        </div>
                    </div>

                </div>

                <div className="w-1/2 flex flex-col gap-3 pt-10 pr-5">
                    <SolidCard title="Total Items" data={itemCount} bgStyle="bg-[#FAD79C]" titleStyle="text-[#D29125]" dataStyle="text-[#D29125]" />
                    <SolidCard title="Total Complaints" data={complaintCount} bgStyle="bg-white  border-2 border-[#fad79c]" titleStyle="text-[#D29125]" dataStyle="text-[#D29125]" />
                </div>
            </div>
        </div>
    );
};

export default BusinessDashboard;
