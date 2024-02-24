import { useEffect, useState } from "react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
interface Props {
  title: React.ReactNode;
  description: string;
}

const Recommendations = ({ title, description }: Props) => {
  const [items, setItems] = useState<any[]>([]);
  const { user, appendToWishlist, removeFromWishlist } = useAuthStore();
  const [updating, setUpdating] = useState(false);

  const checkIfInWishlist = (id: string) => {
    if (!user) return false;
    //@ts-ignore
    const isWishlisted = user.wishlist.includes(id);
    return isWishlisted;
  };

  const handleWishlist = async (id: string) => {
    setUpdating(true);
    if (!user?._id) return;
    try {
      if (checkIfInWishlist(id)) {
        removeFromWishlist(id);
        await axios.post(
          `${import.meta.env.VITE_BASE_URI}/auth/wishlist/remove/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUpdating(false);
      } else {
        appendToWishlist(id);
        await axios.post(
          `${import.meta.env.VITE_BASE_URI}/auth/wishlist/append/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUpdating(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item`);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5 mb-10">
      <div className="flex justify-between items-center mb-2">
        {title}
        <a
          href="/view-all"
          className="text-sm md:block hidden font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
        >
          View All
        </a>
      </div>
      <p className="text-gray-600 mb-6 text-sm max-w-[550px]">{description}</p>
      <div className="flex md:flex-row flex-col gap-6">
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            key={item._id?.toString()}
            className="bg-gradient-to-br w-full md:w-[300px] cursor-pointer relative from-gray-50 h-[330px] to-white rounded-xl overflow-hidden border flex flex-col items-center"
          >
            <div className="h-[200px] overflow-hidden w-full">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-200 shadow-sm hover:scale-110"
              />
              <div
                className="absolute right-4 top-4 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (updating) {
                    // can add a return here;
                  }
                  handleWishlist(item._id);
                }}
              >
                <FaRegHeart
                  className={`${"block"}  text-white/80 text-lg
                }`}
                />
              </div>
              <div className="absolute right-4 top-4">
                {item?._id && (
                  <FaHeart
                    className={`${
                      checkIfInWishlist(item._id?.toString())
                        ? "text-red-500"
                        : "text-black opacity-50"
                    } text-lg`}
                  />
                )}
              </div>
            </div>
            <div className="w-full h-full max-h-[130px] px-4 pt-2">
              <h3 className="text-lg mb-1 mt-2 font-medium">
                {item.title.length > 18
                  ? item.title.slice(0, 18) + "..."
                  : item.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-yellow-600 font-medium">AED {item.price}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-500 text-xs ${
                        index < Math.round(4.5)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <p className="text-xs text-gray-600 ml-2">
                    ({item.reviews?.length})
                  </p>
                </div>
              </div>
              <p className="bg-yellow-500 absolute left-4 bottom-4 text-white text-xs w-fit px-2 py-1 rounded-xl">
                {item.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
