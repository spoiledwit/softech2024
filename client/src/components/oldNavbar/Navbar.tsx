import useAuthStore from "@/store/authStore";
import { BiSun, BiMoon } from "react-icons/bi";

const Navbar = () => {
  const { user, theme, setTheme } = useAuthStore();

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-3 px-10 bg-primary dark:bg-secondary transition-all">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-white dark:text-white text-lg w-full">
            Welcome, {user?.name}
          </p>
          <span
          className="cursor-pointer"
          >
            {theme == "dark" ? (
              <BiMoon
                size={25}
                className="text-black dark:text-white"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSun
                size={25}
                onClick={() => setTheme("dark")}
                className={"text-white dark:text-white"}
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
