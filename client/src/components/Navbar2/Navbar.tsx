import useAuthStore from "@/store/authStore";
import { navLinks } from "@/constants";
import { BiSun, BiMoon, BiUser } from "react-icons/bi";
import logo from '@/assets/logo.png'
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/hooks/auth";
import { FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  const { user, theme, setTheme, cart } = useAuthStore();
  console.log(user);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-2 px-10 bg-white dark:bg-white transition-all">
        <div className="flex flex-row items-center justify-between w-full">
          <Link to={'/'}>
            <img
              src={logo}
              className="w-[65px]"
            />
          </Link>
          {/* <p className="text-black dark:text-black text-lg w-full">
            Welcome, {user?.name}
          </p> */}
          <div className="flex flex-row gap-6 text-lg w-full justify-center">
            {
              navLinks.map((link) => (
                <Link to={link.slug}>
                  {link.title}
                </Link>
              ))
            }

          </div>
          <div className="flex flex-row gap-5 w-fit items-center">
            <Link to={"/cart"} className="relative md:block hidden w-fit mr-10 p-2">
              <span className="absolute right-0 top-[-2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
                {cart ? cart.length : 0}
              </span>
              <FiShoppingBag className="text-2xl text-black" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BiUser size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Hello, {user?.name}</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {
                  user?.businessId &&
                  < Link to={'/panel'}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                }
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span
              className="cursor-pointer"
            >
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
      </div >
    </>
  );
};

export default Navbar;
