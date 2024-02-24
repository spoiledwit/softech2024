import useAuthStore from "@/store/authStore";
import { navLinks } from "@/constants";
import { BiSun, BiMoon, BiUser } from "react-icons/bi";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { logout } from "@/hooks/auth";
import { FiShoppingBag } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, theme, setTheme } = useAuthStore();

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-2 px-16 bg-white dark:bg-white transition-all border-b py-3">
        <div className="flex flex-row items-center justify-between w-full">
          <Link to={"/"}>
            <img src={logo} className="w-[65px]" />
          </Link>
          <div className="flex flex-row gap-6 text-lg w-full justify-center">
            {navLinks.map((link) => (
              <Link className="text-sm" to={link.slug}>
                {link.title}
              </Link>
            ))}
          </div>
          {user ? (
            <p
              onClick={() => {
                logout();
              }}
              className=" whitespace-nowrap mr-6 cursor-pointer"
            >
              Sign Out {user?.name}
            </p>
          ) : (
            <Link className="mr-6" to={"/login"}>
              Login
            </Link>
          )}
          <Link
            to={"/cart"}
            className="relative md:block hidden w-fit mr-10 p-2"
          >
            <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
              {user?.cart ? user.cart.length : 0}
            </span>
            <FiShoppingBag className="text-2xl text-black" />
          </Link>
          <div className="flex flex-row gap-5 w-fit">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BiUser size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {
                  user?.businessId == null ?
                    <Link to={"/business-form"}>
                      <DropdownMenuItem>Become a travel agent</DropdownMenuItem>
                    </Link>
                    :
                    <Link to={"/panel"}>
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                }

                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="cursor-pointer">
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
