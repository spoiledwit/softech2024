import React from "react";
import MarkdownDisplay from "./MarkdownDisplay";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

interface Props {
  content: {
    title: string;
    markdown: string;
  }[];
}

const Content = ({ content }: Props) => {
  const [open, setOpen] = useState<number[]>([]);

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
              className={`text-2xl text-yellow-500 transform transition-transform duration-300 ${
                open.includes(index) ? "rotate-180" : ""
              }`}
            />
          </span>
          {open.includes(index) && <MarkdownDisplay markdown={item.markdown} />}
        </div>
      ))}
    </div>
  );
};

export default Content;
