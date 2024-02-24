import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";

const Counter = ({
  label,
  price,
  ageInfo,
  count,
  setCount,
}: {
  label: string;
  price: number;
  ageInfo?: string;
  count: number;
  setCount: (count: number) => void;
}) => {
  const handleIncrement = (label: string) => {
    if (label === "Infants") {
      return;
    }
    setCount(count + 1);
  };
  const handleDecrement = (label: string) => {
    if (label === "Adults" && count === 1) {
      return;
    }
    if (label === "Infants" && count === 0) {
      return;
    }
    setCount(count > 0 ? count - 1 : 0);
  };

  return (
    <div className="flex justify-between items-center my-2">
      <div className="text-gray-700 font-medium">
        {label} {price}% <br />
        <span className="text-gray-400 text-xs">{ageInfo}</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDecrement(label);
          }}
          className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-semibold rounded-full w-8 h-8 flex items-center justify-center mx-2"
        >
          &ndash;
        </button>
        <span className="text-gray-700 font-semibold">{count}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleIncrement(label);
          }}
          className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-semibold rounded-full w-8 h-8 flex items-center justify-center mx-2"
        >
          &#43;
        </button>
      </div>
    </div>
  );
};

interface Props {
  adults: number;
  setAdults: (count: number) => void;
  children: number;
  setChildren: (count: number) => void;
  infants: number;
  setInfants: (count: number) => void;
}

const PersonSelector = ({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white px-2 py-2 rounded-md border space-y-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <FaUserAlt className="text-lg text-yellow-600" />
            <div className="font-semibold text-yellow-600">Persons</div>
          </div>
        </div>
        <div className="flex">
          <div className="text-xs text-gray-400">
            {adults} adults &nbsp;
          </div>
          <div className="text-xs text-gray-400">
            {children} Children &nbsp;
          </div>
          <div className="text-xs text-gray-400">
            {infants} infants &nbsp;
          </div>
        </div>
      </div>

      {open && (
        <div className="px-2">
          <Counter
            label="Adults"
            price={100}
            count={adults}
            setCount={setAdults}
          />
          <Counter
            label="Children"
            price={90}
            ageInfo="from 5 to 11 years"
            count={children}
            setCount={setChildren}
          />
          <Counter
            label="Infants"
            price={0}
            ageInfo="below 5 years"
            count={infants}
            setCount={setInfants}
          />
          <button className="w-full bg-yellow-600 text-white rounded-md py-2 hover:bg-yellow-700">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;
