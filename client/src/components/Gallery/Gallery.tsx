import img1 from "@/assets/gallery/IF-17908819094789253_640x640.jpg";
import img2 from "@/assets/gallery/IF-17957199353558427_640x640.jpg";
import img3 from "@/assets/gallery/IF-17960663666413890_640x640.jpg";
import img4 from "@/assets/gallery/IF-17982860675308923_640x640.jpg";
import img5 from "@/assets/gallery/IF-18008282528310259_640x640.jpg";
import img6 from "@/assets/gallery/IF-18020960185843421_640x640.jpg";
import img7 from "@/assets/gallery/IF-18029363257583018_640x640.jpg";
import img8 from "@/assets/gallery/IF-18085596118378272_640x640.jpg";
import {
  FaHeart,
} from "react-icons/fa";

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: img1,
      alt: "image1",
      likes: 10,
    },
    {
      id: 2,
      src: img2,
      alt: "image2",
      likes: 24,
    },
    {
      id: 3,
      src: img3,
      alt: "image3",
      likes: 20,
    },
    {
      id: 4,
      src: img4,
      alt: "image4",
      likes: 41,
    },
    {
      id: 5,
      src: img5,
      alt: "image5",
      likes: 33,
    },
    {
      id: 6,
      src: img6,
      alt: "image6",
      likes: 49,
    },
    {
      id: 7,
      src: img7,
      alt: "image7",
      likes: 52,
    },
    {
      id: 8,
      src: img8,
      alt: "image8",
      likes: 19,
    },
    {
      id: 9,
      src: img1,
      alt: "image7",
      likes: 52,
    },
    {
      id: 10,
      src: img6,
      alt: "image8",
      likes: 19,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl">
        Your{" "}
        <span className="text-white italic bg-yellow-500 px-2">moments!</span>
      </h2>
      <p className="mt-3 text-sm max-w-[500px] text-gray-700">
        Each frame captures a story, a memory, and the timeless beauty of our destinations.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 mt-6 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden w-[180px] md:w-[240px]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover hover:scale-110 transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-fit p-5">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-white text-lg" />
                <p className="text-white text-sm">{image.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
