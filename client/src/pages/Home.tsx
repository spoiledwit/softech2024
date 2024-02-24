import Navbar from '@/components/Navbar/Navbar'
import React, { useEffect, useState } from "react";
import desert from "@/assets/desert.png";
import img2 from "@/assets/cruise.png";
import img3 from "@/assets/waterslide-398249_1280.jpg";
import img4 from "@/assets/burj.jpg";
// import { FaLocationDot } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import locator from "@/assets/locator.png";
import { motion } from "framer-motion";
// import SearchBar from "@/components/Home/SearchBar";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import Services from '@/components/Services/Services';
import Recommendations from '@/components/Recommendations/Recommendations';
import Gallery from '@/components/Gallery/Gallery';

const Home = () => {

  const slides = [
    {
      id: 0,
      title: "Embark on a Dazzling Desert Odyssey in Dubai",
      description:
        "Embark on an exhilarating journey across the golden dunes of Dubai. Our Desert Safari invites you into the heart of the Arabian desert, where adventure meets serenity. ",
      link: "/desert-safari-dubai",
      location: "Dubai, UAE",
      image: desert,
      highlights: [
        "Dune Bashing Thrills",
        "Sunset Photography Sessions",
        "Starlit BBQ Feast",
        "Cultural Performances",
        "Falconry Demonstrations",
        "Overnight Stay Options",
      ],
      ctaText: "Discover the Desert Magic",
    },
    {
      id: 1,
      title: "Set Sail on a Luxurious Dubai Marina Cruise",
      description:
        "Drift along the Venice of the Middle East on our elegant cruise boats. Immerse yourself in the opulence of Dubai's skyline as you navigate through the glistening waters of the Dubai Marina.",
      link: "/dubai-marina-cruise",
      location: "Dubai Marina, UAE",
      image: img2,
      highlights: [
        "Gourmet Dining on Water",
        "Breathtaking Views of Iconic Landmarks",
        "Live Entertainment on Deck",
        "Sunset and Moonlight Cruises Available",
        "Private Charter Options",
      ],
      ctaText: "Cruise into Elegance",
    },

    {
      id: 2,
      title: "Dubai's Thrilling Water Slide Escape",
      description:
        "Dive into the thrill of Dubai's most spectacular water slides! Feel the rush as you zoom down our adrenaline-pumping aquatic marvels, wrapped in the scenic embrace of our water park.",
      link: "/dubai-water-park",
      location: "Dubai, UAE",
      image: img3,
      highlights: [
        "High-Speed Water Slides",
        "Family-Friendly Attractions",
        "Wave Pools and Lazy Rivers",
        "Private Cabanas and Sun Loungers",
        "Diverse Range of Dining Options",
      ],
      ctaText: "Slide into Fun",
    },
    {
      id: 3,
      title: "Dubai's Iconic Landmarks Tour",
      description:
        "Witness the grandeur of Dubai with our curated tour of the city's most iconic attractions. Marvel at the architectural splendor of Burj Al Arab and explore the historic quarters of Dubai Creek.",
      link: "/dubai-landmarks-tour",
      location: "Dubai, UAE",
      image: img4,
      highlights: [
        "Guided Tours of Burj Al Arab",
        "Exclusive Access to Heritage Sites",
        "Panoramic Views from Burj Khalifa",
        "Luxury Transport Options",
        "Personalized Group Itineraries",
      ],
      ctaText: "Discover Dubai's Wonders",
    },
  ];

  const [selectedSlides, setSelectedSlides] = useState(slides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide == selectedSlides.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div>
        <div className={`flex w-full relative h-screen`}>
          <div className="flex gap-6 w-full">
            <div className="w-full h-screen items-center justify-center overflow-hidden relative flex md:pl-16 px-8">
              <motion.img
                src={selectedSlides[currentSlide].image}
                alt="slide"
                key={currentSlide}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
              />
              <div
                className=" flex flex-col justify-center items-center h-full relative z-10 max-w-[600px] mt-6"
                style={{
                  zIndex: 10,
                }}
              >
                <motion.h2
                  className="text-white font-medium text-center text-3xl md:text-5xl"
                  key={currentSlide}
                  initial={{ scale: 1.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {selectedSlides[currentSlide].title}
                </motion.h2>
                <p className="text-white mt-3 text-center text-sm">
                  {selectedSlides[currentSlide].description}
                </p>
                <Link
                  to={selectedSlides[currentSlide].link}
                  className="text-white font-medium mt-12 md:mt-4 bg-yellow-500 transition-all duration-200 hover:bg-yellow-600 text-center items-center flex justify-center text-sm w-fit px-5 h-[45px] min-w-[170px] rounded-md"
                >
                  {slides[currentSlide].ctaText}
                  <GoArrowRight className="text-xl ml-2" />
                </Link>
              </div>
              <img
                src={locator}
                alt="locator"
                width={200}
                height={200}
                style={{
                  zIndex: 10,
                }}
                className="ml-[-20px] md:block hidden right-16 bottom-10 absolute"
              />
              <div
                className="hidden left-16 md:flex items-center absolute bottom-10 text-white"
                style={{
                  zIndex: 10,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${index === currentSlide
                      ? "bg-white"
                      : "bg-gray-400 bg-opacity-75"
                      }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <div className="absolute  bottom-0 left-0 w-full h-full bg-black bg-opacity-50" />
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div
        className="px-8 md:px-16"
      >
        <Recommendations
          title={
            <>
              <h2 className="text-2xl font-medium text-yellow-600">
                <span className="bg-yellow-500 text-white px-2 italic">
                  Recommended
                </span>{" "}
                for you!
              </h2>
            </>
          }
          description="Dive into a world of discovery, with handpicked experiences that promise
        to delight, surprise, and inspire."
        />
        <Gallery />
      </div>
    </>
  )
}

export default Home