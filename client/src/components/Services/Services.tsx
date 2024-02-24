import { useNavigate } from "react-router-dom";
import bkdrop1 from "@/assets/backdrops/1.png";
import bkdrop2 from "@/assets/backdrops/2.png";
import bkdrop3 from "@/assets/backdrops/3.png";
import bkdrop4 from "@/assets/backdrops/4.png";
import burj from "@/assets/1-burj-al-arab3.webp";
import cruise from "@/assets/cruise.png";
import waterslide from "@/assets/waterslide-398249_1280.jpg";
import sampleimg from "@/assets/desert.png";

const Services = () => {
   const sampleCats = [
    "Historical Sites",
    "Natural Wonders",
    "Cultural Attractions",
    "Adventure Spots",
    "Hajj and Umrah",
  ]

  const navigate = useNavigate();
  const bkdrops = [
    {
      id: 1,
      img: bkdrop3,
      title: "Historical Sites",
      img2: sampleimg,
    },
    {
      id: 2,
      img: bkdrop2,
      title: "Natural Wonders",
      img2: burj,
    },
    {
      id: 3,
      img: bkdrop1,
      title: "Cultural Attractions",
      img2: cruise,
    },
    {
      id: 4,
      img: bkdrop4,
      title: "Adventure Spots",
      img2: waterslide,
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
            onClick={()=>{
                navigate(`/category/${item.title.toLowerCase().split(' ').join('-')}`)
            }}
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
