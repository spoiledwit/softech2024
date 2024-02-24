import useAuthStore from "@/store/authStore";
import { BiSun, BiMoon } from "react-icons/bi";
import logo from '@/assets/logo.png'

const Navbar = () => {
  const { user, theme, setTheme } = useAuthStore();

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-4 px-10 bg-white dark:bg-white transition-all">
        <div className="flex flex-row items-center justify-between w-full">
          <img
            src={logo}
            className="w-[70px]"
          />
          {/* <p className="text-black dark:text-black text-lg w-full">
            Welcome, {user?.name}
          </p> */}
          <div>
              
          </div>
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
    </>
  );
};

export default Navbar;
