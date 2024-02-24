import { categories } from "@/constants";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const MobileNav = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="bg-white fixed top-0 left-0 h-full md:hidden block shadow-md w-full">
      <div className="container mx-auto py-3 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="Eozmo Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>
        <button onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-10 pl-7">
        {categories.map((category) => (
          <Link
            href={`/category/${category.title.toLowerCase().replace(" ", "-")}`}
            key={category.title}
          >
            <p
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              {category.title}
            </p>
          </Link>
        ))}
        <Link href={"/wishlist"}>
          <p
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            Wishlist
          </p>
        </Link>
        <Link href={"/cart"}>
          <p
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            Cart
          </p>
        </Link>
        <Link href={"/login"}>
          <p
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            Login/Signup
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
