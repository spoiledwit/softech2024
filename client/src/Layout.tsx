import { Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { loginBack } from "./hooks/auth";
import { Toaster } from "./components/ui/toaster";
import SideBar from "./components/Sidebar/SideBar";
import { useToast } from "./components/ui/use-toast";
import Navbar from "./components/Navbar/Navbar";
import './layout.css'

const Layout = () => {
  const { user } = useAuthStore();
  const { setSocket, socket } = useSocketStore();
  const { setUser, setToken } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      setUser(res?.user);
      if (res?.token) {
        setToken(res.token);
      }
    } catch (error: any) {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
      toast({
        title: (error.message),
        description: "Please try again",
        variant: "destructive",
      })
    }
  };

  useEffect(() => {
    try {
      const socketConnect = io("http://localhost:5000");
      setSocket(socketConnect);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user._id);
    }
  }, [user, socket]);

  return (
    <>
      {user && (
        <div>
          <Navbar />
        </div>
      )}

      <div className="min-h-screen flex relative w-full">
        <Toaster />
        {user && (
          <>
            <div className="w-[350px]">
              <SideBar />
            </div>
          </>
        )}

        <div className="w-full h-screen" id="outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
