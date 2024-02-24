import { CategoryType } from "@/types";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    slug: "/",
  },
  {
    id: "blog",
    title: "Blog",
    slug: "/blog",
  },
  {
    id: "services",
    title: "Services",
    slug: "/services",
  },
  {
    id: "about",
    title: "About",
    slug: "/about",
  },
  {
    id: "contact",
    title: "Contact",
    slug: "/contact",
  },

];

export const categories: CategoryType[] = [
  {
    title: "Desert Adventures",
    image: "https://eozmo.vercel.app/_next/static/media/desertsafari.4d0581b1.jpeg",
    subcategories: [
      {
        title: "Desert Safaris",
        image: "https://eozmo.vercel.app/_next/static/media/desertsafari.4d0581b1.jpeg",
      },
      {
        title: "Desert Experiences",
        image: "https://eozmo.vercel.app/_next/static/media/desertsafari.4d0581b1.jpeg",
      },
      {
        title: "Desert Camping",
        image: "https://eozmo.vercel.app/_next/static/media/desertsafari.4d0581b1.jpeg",
      },
      {
        title: "Dune Buggies",
        image: "https://eozmo.vercel.app/_next/static/media/desertsafari.4d0581b1.jpeg",
      }
    ]
  },
  {
    title: "Cruises & Sailing",
    image: "https://eozmo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcruise.52e66f29.png&w=640&q=75",
    subcategories: []
  },
  {
    title: "Water Sports",
    image: "https://eozmo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwaterslide-398249_1280.cc086bea.jpg&w=640&q=75",
    subcategories: []
  },
  {
    title: "Tours & Sightseeing",
    image: "https://eozmo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fburj.38927013.jpg&w=640&q=75",
    subcategories: []
  },
];

export const otherNavItems = [
  {
    title: "Blog",
    link: "/blog"
  },
  {
    title: "Support",
    link: "/support"
  }
];
