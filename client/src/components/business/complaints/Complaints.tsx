import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Complaints = () => {
    const { user } = useAuthStore();    
    const [items, setItems] = useState([]);
    const [deleting, setDeleting] = useState(false);

    async function getAllComplaints() {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URI}/item/business/${user?.businessId}`
            );
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id: string) => {
        setDeleting(true);
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URI}/item/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            getAllComplaints();
        } catch (error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        getAllComplaints();
    }, []);

    return (
        <>
            <div className="flex w-full flex-row mb-3 justify-between">
                <h1 className="text-2xl font-semibold mb-3">Complaints</h1>
                {/* <Link to={`/panel/create-item`}>
                    <Button className="">Create item</Button>
                </Link> */}
            </div>
            <Table>
                <TableCaption>A list of all complaints submitted to your business</TableCaption>
                <TableHeader className="hover:bg-secondary bg-secondary">
                    <TableRow className="bg-secondary hover:bg-secondary">
                        {/* <TableHead className="w-[100px]">Cover</TableHead> */}
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[100px]">User name</TableHead>
                        <TableHead className="w-[100px]">Message</TableHead>
                        <TableHead className="w-[100px]">Created At</TableHead>
                        <TableHead className="w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((item: any) => (
                        <TableRow key={item._id} className="">
                            {/* <TableCell className="font-medium">
                                <img
                                    className="w-10 h-10 object-cover rounded-full"
                                    src={item.images[0]}
                                    alt=""
                                />
                            </TableCell> */}
                            <TableCell className="font-medium">{item._id}</TableCell>
                            <TableCell className="font-medium">{item.businessId}</TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="font-medium">{item.price}</TableCell>
                            <div className="grid grid-2 grid-cols-2 gap-2 justify-start items-start p-1">
                                <Button
                                    disabled={deleting}
                                    onClick={() => deleteItem(item._id)}
                                    className="border border-black bg-transparent hover:text-white  text-black"
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </Button>
                                <Button
                                    disabled={deleting}
                                    onClick={() => deleteItem(item._id)}
                                    className="bg-red-500 text-white hover:bg-red-600"
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default Complaints;
