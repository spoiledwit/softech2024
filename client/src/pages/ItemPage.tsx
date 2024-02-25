import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PlaceGallery from "@/components/Item/PlaceGallery";
import loadinganimation from "@/assets/loading.gif";
import { Link } from "react-router-dom";
import Booking from "@/components/Item/Booking";
import Content from "@/components/Item/Content";
import { useParams } from "react-router-dom";
import Recommendations from "@/components/Item/Recommendations";
import ItemMap from "@/components/maps/itemMap";

const Item = () => {
  const [item, setItem] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/${id}`);
      setItem(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-6 mt-20 px-8 md:px-16 ">
      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <img src={loadinganimation} alt="loading" />
        </div>
      ) : item ? (
        <div className="min-h-[60px]">
          <div>
            <div className="flex md:flex-col  xl:flex-row lg:flex-row flex-col w-full">
              <div>
                <div className="text-sm md:block hidden text-gray-500 mb-2">
                  <Link
                    to={{
                      pathname: "/",
                    }}
                  >
                    Home
                  </Link>{" "}
                  /{" "}
                  <Link
                    to={{
                      pathname: `/items/${item.category}`,
                    }}
                  >
                    {item.category}
                  </Link>{" "}
                  <Link
                    to={{
                      pathname: `/items/${item.category}/${item.subcategory}`,
                    }}
                  >
                    / {item.subcategory}
                  </Link>{" "}
                  <Link
                    to={{
                      pathname: `/item/${item._id}`,
                    }}
                  >
                    / {item.title}
                  </Link>
                </div>

                <h1 className="text-2xl md:text-4xl text-yellow-600 font-semibold mb-3 w-fit">
                  {item.title}
                </h1>
                <h2 className="text-sm font-semibold mb-3 px-3 py-1 italic text-white bg-yellow-500 w-fit">
                  {item.category}
                </h2>
                <PlaceGallery photos={item.images} />
                <Content content={item.content} item={item} />
              </div>
              <div className="md:my-16 xl:ml-6 lg:ml-6 md:ml-6  xl:my-32 lg:my-32 w-full">
                <Booking item={item} />
              </div>
            </div>
            <ItemMap 
            lat={item.location.lat}
            lng={item.location.lng}
            />
            <hr className="mt-6 md:block" />
            <Recommendations
              title={
                <>
                  <h2 className="text-2xl font-medium text-yellow-600">
                    <span className="bg-yellow-500 text-white px-2 italic">
                      Find more
                    </span>{" "}
                    like this!
                  </h2>
                </>
              }
              description="Find more experiences like this one, that promise to delight, surprise, and inspire."
            />
          </div>
        </div>
      ) : (
        <>
          <p>Item not found</p>
        </>
      )}
    </div>
  );
};

export default Item;