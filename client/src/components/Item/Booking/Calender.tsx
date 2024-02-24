import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarDate } from "react-icons/bs";
import { useState } from "react";

const Calendar = ({
  startDate,
  setStartDate,
}: {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex border justify-between items-center p-2 rounded-md cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="flex items-center gap-2">
        <BsCalendarDate className="text-xl text-yellow-600" />
        <h3 className="font-semibold text-yellow-600">Date</h3>
      </span>
      <span className="text-gray-400 font-medium text-right text-sm">
        <DatePicker
          className="w-fit max-w-[90px]"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
        />
      </span>
    </div>
  );
};

export default Calendar;
