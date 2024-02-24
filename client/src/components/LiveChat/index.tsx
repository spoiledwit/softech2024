import useSocketStore from "@/store/socketStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import useAuthStore from "@/store/authStore";

const LiveChat = ({ item }: { item: any }) => {
  const { socket } = useSocketStore();
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("onlineUsers", (users: any) => {
      setOnlineUsers(users);
    });
    socket.emit("getOnlineUsers");
    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const handleCreateConversation  = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URI}/conversation`, {
        receiverId: item.sellerId,
        senderId: user?._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      navigate(`/chat/${res.data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 if (onlineUsers.find((user: any) => user.userId === item.sellerId)) {
   return (
     <div>
      <Button
      onClick={handleCreateConversation}
      className="w-full"
      >
        {loading ? ("Loading...") : ("Start Live Chat")}
      </Button>
     </div>
   );
  
 }
};

export default LiveChat;