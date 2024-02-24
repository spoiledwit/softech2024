import logo from "@/assets/logo.png";
import { categories } from "@/constants";
import { FiShoppingBag } from "react-icons/fi";
// import {  } from "react-icons/fa";
import { otherNavItems } from "@/constants";
import { useState, useEffect } from "react";
import { CgMenuRight } from "react-icons/cg";
import { Link } from "react-router-dom";;
import useAuthStore from "@/store/authStore";
import MobileNav from "./MobileNav";

const Navbar = () => {
  // const {
  //   status,
  //   auth,
  //   setStatus,
  //   cart,
  //   wishlist,
  //   clearCart,
  //   clearWishlist,
  //   clearAuth,
  // } = useAuthStore();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // const handleSignOut = async () => {
  //   await signOut();
  //   clearCart();
  //   clearWishlist();
  //   clearAuth();
  // };

  useEffect(() => {
    // storeInitializer();
    // if (auth) {
    //   setStatus("success");
    // } else {
    //   setStatus("error");
    // }
  }, []);

  return (
    <div
      className="bg-white shadow-md fixed z-10 w-full"
    // style={{
    //   zIndex: 1000,
    // }}
    >
      <div className="container mx-auto py-3 flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Eozmo Logo"
            className="object-contain w-[40px]"
          />
        </Link>{" "}
        <div className="md:flex hidden gap-6 text-sm">
          {categories.map((category) => (
            <Link
              to={`/category/${category.title
                .toLowerCase()
                .replace(" ", "-")}`}
              key={category.title}
            >
              <p>{category.title}</p>
            </Link>
          ))}
          {otherNavItems.map((item) => (
            <Link to={"/"} key={item.title}>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="justify-center flex items-center">
          {/* {status === "loading" ? (
            <p className="mr-5 font-medium md:block hidden">Loading...</p>
          ) : status === "success" ? (
            <p
              className="mr-5 font-medium md:block hidden cursor-pointer"
            // onClick={handleSignOut}
            >
              Sign out
            </p>
          ) : (
            <Link to={"/login"} className="mr-5 md:block hidden font-medium">
              Login/SignUp
            </Link>
          )} */}

          <div className="relative w-fit md:block hidden mr-2 p-2">
            {/* <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
              {wishlist ? wishlist.length : 0}
            </span> */}
            {/* <FaRegHeart className="text-2xl text-black" /> */}
          </div>

          <Link to={"/cart"} className="relative md:block hidden w-fit mr-10 p-2">
            {/* <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
              {cart ? cart.length : 0}
            </span> */}
            <FiShoppingBag className="text-2xl text-black" />
          </Link>

          <CgMenuRight
            className="text-3xl text-black ml-4"
            onClick={() => { setIsMobileNavOpen(true) }}
          />
          {isMobileNavOpen && (
            <MobileNav
              handleClose={() => setIsMobileNavOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
