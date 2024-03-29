import React, { useEffect } from "react";
import MarkdownDisplay from "./MarkdownDisplay";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";
import ReviewInput from "@/components/Review/ReviewInput";
import axios from "axios";
import Review from "@/components/Review/Review";
import { ReviewType } from "@/types";

interface Props {
  content: {
    title: string;
    markdown: string;
  }[];
  item: any
}

const Content = ({ content, item }: Props) => {
  const [open, setOpen] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState(item.reviews);

  async function getReview() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/item/review/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res.data);
      setReviews(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReview();
    console.log(reviews);
  }, [])


  return (
    <div className="mt-10 md:mr-12 text-[16px] flex flex-col gap-6">
      <hr />
      {content.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border-b pb-6 cursor-pointer"
          onClick={() => {
            if (open.includes(index)) {
              setOpen(open.filter((i) => i !== index));
            } else {
              setOpen([...open, index]);
            }
          }}
        >
          <span className="flex items-center justify-between">
            <h2 className="md:text-3xl italic px-2 bg-yellow-500 text-white w-fit font-semibold mb-2">
              {item.title}
            </h2>
            <GoChevronDown
              className={`text-2xl text-yellow-500 transform transition-transform duration-300 ${open.includes(index) ? "rotate-180" : ""
                }`}
            />
          </span>
          {open.includes(index) && <MarkdownDisplay markdown={item.markdown} />}
        </div>
      ))}
      <div className="">
        <h3 className="text-2xl text-primary font-semibold">Leave a review</h3>
        <ReviewInput getReview={getReview} item={item} />
        <div className="flex flex-col gap-3 mt-5">
          {
            reviews?.map((review: ReviewType) =>
              <Review review={review} />
            )
          }
        </div>

      </div>
    </div>
  );
};

export default Content;
