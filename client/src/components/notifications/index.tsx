import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/store/authStore";
import { toReadableDate } from "@/lib/utils";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Notification() {
  const { user } = useAuthStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative md:block hidden w-fit p-2 cursor-pointer mr-3">
          <span className="absolute right-[4px] top-[2px] bg-red-500 w-[20px] h-[20px] text-center font-light flex justify-center items-center text-[10px] text-white rounded-full">
            {user?.notifications ? user.notifications.length : 0}
          </span>
          <IoMdNotificationsOutline className="text-3xl text-black" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        {!user?.notifications?.length && (
            <p className="text-sm text-gray-500">No notifications yet...</p>
          )}
        <div className="grid gap-4 py-4">
          {user?.notifications?.map((notification: any) => (
            <div className="flex flex-row items-center gap-4">
              <div
              className="text-sm text-gray-600"
              >
                <p>{notification?.content}</p>
                <p>{toReadableDate(notification?.createdAt)}</p>
              </div>
            </div>
          ))}
         
        </div>
       
      </DialogContent>
    </Dialog>
  );
}
