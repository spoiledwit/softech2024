import useLanguageStore from "@/store/languageStore";

import { FaHeart } from "react-icons/fa";

const Gallery = () => {
  const language = useLanguageStore((state) => state.language);
  const isEnglish = language === "en";

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1575101261474-5cb5653bb416?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image1",
      likes: 10,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1575225799901-e56c019e9450?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image2",
      likes: 24,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image3",
      likes: 20,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1572358899655-f63ece97bfa5?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image4",
      likes: 41,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1617128072203-310a93722ad8?q=80&w=1837&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image5",
      likes: 33,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1582122183292-e660e1faecc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image6",
      likes: 49,
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1606511490662-b2c5be7d95a1?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image7",
      likes: 52,
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?q=80&w=1842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image8",
      likes: 19,
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1608020932658-d0e19a69580b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image7",
      likes: 52,
    },
    {
      id: 10,
      src: "https://plus.unsplash.com/premium_photo-1670745800247-271e8977da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "image8",
      likes: 19,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl">
        {isEnglish ? <>Your </> : <>آپ کے </>}
        <span className="text-white italic bg-yellow-500 px-2">
          {isEnglish ? <>Gallery</> : <>گیلری</>}
        </span>
      </h2>
      <p className="mt-3 text-sm max-w-[500px] text-gray-700">
        {isEnglish ? (
          <>
            {" "}
            Each frame captures a story, a memory, and the timeless beauty of
            our destinations.
          </>
        ) : (
          <>
            {" "}
            ہر فریم ایک کہانی، ایک یاد، اور ہمارے منزلوں کی دائمی خوبصورتی کو
            کھینچتا ہے۔
          </>
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden sm:w-[300px] w-full md:w-[240px]"
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
