import React from "react";
import { Link } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaBoxOpen,
    FaFileInvoiceDollar,
    FaCog,
} from "react-icons/fa";

const Sidebar = () => {


    const links = [
        {
            id: 0,
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            id: 1,
            name: "Customers",
            path: "/panel/customers",
            icon: <FaUsers />,
        },
        {
            id: 2,
            name: "Trips",
            path: "/panel/trips",
            icon: <FaBoxOpen />,
        },
        {
            id: 3,
            name: "Orders",
            path: "/admin/orders",
            icon: <FaFileInvoiceDollar />,
        },
        // {
        //     id: 4,
        //     name: "Settings",
        //     path: "/admin/settings",
        //     icon: <FaCog />,
        // },
    ];

    return (
        <div className="bg-white border w-[300px] h-screen pt-6 px-4 flex flex-col gap-4">
            {links.map((link) => (
                <Link to={link.path} key={link.id}>
                    <p className={`flex items-center px-4 py-2 rounded-xl gap-2 text-gray-700 hover:bg-gray-100 `}>
                        <span className="text-xl text-white p-2 rounded-lg bg-yellow-500">{link.icon}</span>
                        <span className="ml-2 font-semibold">{link.name}</span>
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
