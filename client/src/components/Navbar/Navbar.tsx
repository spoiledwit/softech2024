import useAuthStore from "@/store/authStore";
import { navLinks } from "@/constants";
import { BiSun, BiMoon, BiUser } from "react-icons/bi";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { logout } from "@/hooks/auth";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Notification from "../notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const { user, theme, setTheme } = useAuthStore();

  return (
    <>
      <div
        style={{
          zIndex: 1000,
        }}
        className="w-full top-0 fixed flex flex-row items-center justify-between p-2 px-16 bg-white dark:bg-white transition-all border-b py-3"
      >
        <div className="flex flex-row items-center justify-between w-full">
          <Link to={"/"}>
            <img src={logo} className="w-[65px]" />
          </Link>
          <div className=" flex-row gap-6 text-lg w-full justify-center xl:flex lg:flex md:flex sm:hidden hidden">
            {navLinks.map((link) => (
              <Link className="text-sm" to={link.slug}>
                {link.title}
              </Link>
            ))}
          </div>

          <Link to={"/cart"} className="relative md:block xl:block lg:block hidden w-fit p-2">
            <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
              {user?.cart ? user.cart.length : 0}
            </span>
            <FiShoppingBag className="text-2xl text-black" />
          </Link>
          <Link to={"/wishlist"} className="relative md:block lg:block xl:block hidden w-fit p-2">
            <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
              {user?.wishlist ? user.wishlist.length : 0}
            </span>
            <FaRegHeart className="text-2xl text-black" />
          </Link>
          <div>
            <Notification />
          </div>
          <div className="flex flex-row gap-5 w-fit">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {user?.picture ? (
                  <>
                    <img
                      src={user.picture}
                      className="xl:w-[60px] lg:w-[70px] md:w-[80px] w-[50px]   object-cover rounded-full"
                      alt=""
                    />
                  </>
                ) : (
                  <BiUser size={25} />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                style={{
                  right: 0,
                  top: "50px",
                  width: "200px",
                  zIndex: 1000,

                }}>
                <DropdownMenuItem>
                  <Link to={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                {user?.businessId == null ? (
                  <Link to={"/business-form"}>
                    <DropdownMenuItem>Become a travel agent</DropdownMenuItem>
                  </Link>
                ) : (
                  <Link to={"/panel"}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                )}
                {
                  user &&
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>

                }
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              
            </div>
            <span className="cursor-pointer items-center xl:flex lg:flex md:flex hidden">
              {theme == "dark" ? (
                <BiMoon
                  size={25}
                  className="text-black dark:text-black"
                  onClick={() => setTheme("light")}
                />
              ) : (
                <BiSun
                  size={25}
                  onClick={() => setTheme("dark")}
                  className={"text-black dark:text-black"}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
