import { Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect, useState } from "react";
import { loginBack } from "./hooks/auth";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import "./layout.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ItemsMap from "./components/maps/itemsMaps";
import Bot from "./components/Bot";
import { IoMdClose } from "react-icons/io";
import { FaRegMap } from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";
import {io} from "socket.io-client";

const socketConnect = io("http://localhost:4000");

const Layout = () => {
  const { user } = useAuthStore();
  const { setSocket, socket } = useSocketStore();
  const { setUser, setToken } = useAuthStore();
  const { toast } = useToast();
  useEffect(()=>{
    setSocket(socketConnect);
  }, [socketConnect]);
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
        title: error.message,
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user._id);
    }
  }, [user, socket]);

  const [showMap, setShowMap] = useState(false);
  const [showBot, setShowBot] = useState(false);

  return (
    <>
      {user && (
        <div>
          <Navbar />
        </div>
      )}
      {showBot && <Bot setOpen={setShowBot}/>}
      {!showBot && (
        <button
          style={{
            zIndex: 1000,
          }}
          onClick={() => setShowBot(true)}
          className="fixed bottom-28 right-10 bg-white p-3 rounded-full shadow-md"
        >
          <SiRobotframework className="text-4xl text-yellow-500" />
        </button>
      )}
      <div
        style={{
          zIndex: 10000,
        }}
      >
        <Toaster />
      </div>

      <div>
        {showMap && <ItemsMap />}
        {!showMap && (
          <div>
            <button
              style={{
                zIndex: 1000,
              }}
              onClick={() => setShowMap(true)}
              className="fixed bottom-10 right-10 bg-white p-3 rounded-full shadow-md"
            >
              <FaRegMap className="text-4xl text-yellow-500" />
            </button>
          </div>
        )}
        {showMap && (
          <button
            style={{
              zIndex: 1000,
            }}
            onClick={() => setShowMap(false)}
            className="fixed bottom-10 right-10 bg-white p-3 rounded-full shadow-md"
          >
            <IoMdClose className="text-4xl text-yellow-500" />
          </button>
        )}
        
        <Outlet />
      </div>
      {user && <Footer />}
    </>
  );
};

export default Layout;
