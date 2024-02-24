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

const Orders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [deleting, setDeleting] = useState(false);

  async function getAllOrders() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/order/business/${user?.businessId}`
      );
      console.log(res.data)
      setOrders(res.data);
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
      getAllOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div className="flex w-full flex-row mb-3 justify-between">
        <h1 className="text-2xl font-semibold mb-3">Orders</h1>
        {/* <Link to={`/panel/create-item`}>
          <Button className="">Create item</Button>
        </Link> */}
      </div>
      <Table>
        <TableCaption>A list of your orders</TableCaption>
        <TableHeader className="hover:bg-secondary bg-secondary">
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="w-[100px]">Cover</TableHead>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead className="w-[100px]">Business Id</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((item: any) => (
            <TableRow key={item._id} className="">
              <TableCell className="font-medium">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={item.images[0]}
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium">{item._id}</TableCell>
              <TableCell className="font-medium">{item.businessId}</TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="font-medium">{item.price}</TableCell>
              <Button
                disabled={deleting}
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white"
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;
