import React from "react";
import bkdrop1 from "@/assets/backdrops/1.png";
import bkdrop2 from "@/assets/backdrops/2.png";
import bkdrop3 from "@/assets/backdrops/3.png";
import bkdrop4 from "@/assets/backdrops/4.png";
import burj from "@/assets/1-burj-al-arab3.webp";
import cruise from "@/assets/cruise.png";
import waterslide from "@/assets/waterslide-398249_1280.jpg";
import sampleimg from "@/assets/desert.png";

const Services = () => {
  const bkdrops = [
    {
      id: 1,
      img: bkdrop3,
      title: "Desert Adventures",
      img2: "https://images.unsplash.com/photo-1689101300631-a6d0dc585cde?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      img: bkdrop2,
      title: "Tours & Sightseeing",
      img2: "https://images.unsplash.com/photo-1622626484839-c1ee989db061?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      img: bkdrop1,
      title: "Winter Fiesta",
      img2: "https://images.unsplash.com/photo-1584732200355-486a95263014?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      img: bkdrop4,
      title: "Water Sports",
      img2: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleMouseEnter = (id: any) => {
    const element = document.getElementById(`img-${id}`);
    if (element) {
      element.classList.add("hover");
    }
  };

  const handleMouseLeave = (id: any) => {
    const element = document.getElementById(`img-${id}`);
    if (element) {
      element.classList.remove("hover");
    }
  };

  return (
    <div className="min-h-[400px] py-10 px-8 md:px-16">
      <h2 className="text-2xl">
        Our{" "}
        <span className="bg-yellow-500 px-2 italic text-white">
          Experiences!
        </span>
      </h2>
      <p className="mt-3 text-sm max-w-[500px] text-gray-700">
        Embark on an epic journey with us—award-winning desert safaris and
        iconic global attractions await!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {bkdrops.map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer h-[50vh] md:h-[400px] w-full md:w-[300px] bg-gray-200 rounded-xl overflow-hidden"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            <img
              id={`img-${item.id}`}
              src={item.img}
              alt=""
              className="absolute z-10 inset-0 h-full w-full object-cover cursor-pointer transition duration-300 ease-in-out"
            />
            <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center">
              <div className="border border-dotted rounded-xl p-1">
                <img
                  id={`img2-${item.id}`}
                  src={item.img2}
                  alt=""
                  className="w-[150px] h-[150px] rounded-border rounded-xl"
                />
              </div>

              <h2 className="text-3xl mt-4 text-white font-semibold uppercase text-center max-w-[200px] underline cursor-pointer transition duration-300 ease-in-out">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
