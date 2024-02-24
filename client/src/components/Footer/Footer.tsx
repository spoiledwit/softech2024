import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-t-yellow-500">
      <div className="py-12 px-8 md:px-16">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-[450px]">
            <h3 className="text-sm font-medium mb-2 tracking-wider uppercase text-black">
              Sign Up!
            </h3>
            <p className="text-gray-700 font-light md:block hidden text-xs mt-2">
              Get regular updates about upcoming events, trip planning advice
              and compelling stories. Subscribe to our newsletter.
            </p>
            <form className="flex mt-4 flex-col sm:flex-row sm:items-end">
              <button
                type="submit"
                className="py-2 px-6 border whitespace-nowrap border-transparent text-sm font-medium rounded-full text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"
              >
                Sign up for our E-Newsletter
              </button>
            </form>
            <div className="flex space-x-3 mt-6">
              <FaFacebookF className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
              <FaInstagram className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
              <FaTwitter className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
              <FaYoutube className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
              <FaPinterest className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
              <FaTiktok className="text-yellow-500 hover:text-yellow-500 bg-black rounded-full p-[5px] text-2xl cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase text-black">
              Contact Us
            </h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>
                <FaPhone className="rotate-90 text-yellow-500 inline mr-2" /> +1 800-555-5555
              </li>
              <li>
                <FaEnvelope className="inline text-yellow-500  mr-2" />
                <a href="mailto:test.com"> teamitu@gmail.com</a>
              </li>
              <li>
                <FaWhatsapp className="inline text-lg mr-2 text-yellow-500 " />
                <a href="https://wa.me/1234567890"> +92 900 76201</a>
              </li>
              <li>
                <FaMapMarkerAlt className="inline mr-2 text-yellow-500  text-lg" />
                <a href="https://goo.gl/maps/7x4K1j2Fp3z">
                  123 Main Street, Anytown, USA 12345
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase text-black">
              Our <span className=" bg-yellow-500 text-white px-1">Experiences!</span>
            </h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>Historical Sites</li>
              <li>Natural Wonders</li>
              <li>Cultural Attractions</li>
              <li>Adventure Spots</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase text-black">
              About us
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Careers</li>
              <li>Ambassador Program</li>
              <li>Business Directory</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-3 mt-12 border-t border-gray-300 pt-8">
          <p className="text-center text-sm">
            &copy; Team ITU 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
