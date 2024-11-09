import React, { useState } from "react";

const CustomTimePicker = ({ onChange, value }) => {
  const [hours, setHours] = useState(value ? value.split(":")[0] : "12");
  const [minutes, setMinutes] = useState(value ? value.split(":")[1].slice(0, 2) : "00");
  const [ampm, setAmpm] = useState(value ? value.split(":")[1].slice(2) : "AM");

  const handleTimeChange = () => {
    onChange(`${hours}:${minutes}${ampm}`);
  };

  return (
    <div className="w-full mt-1">
      <label className="block text-gray-700 text-sm font-medium mb-2">Select Time:</label>
      <div className="flex space-x-2">
        <select
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-1/3 p-2 text-xl border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[...Array(12).keys()].map((hour) => {
            const hourStr = (hour + 1).toString().padStart(2, "0");
            return (
              <option key={hour} value={hourStr}>
                {hourStr}
              </option>
            );
          })}
        </select>

        <select
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-1/3 p-2 text-xl border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[...Array(60).keys()].map((minute) => {
            const minuteStr = minute.toString().padStart(2, "0");
            return (
              <option key={minute} value={minuteStr}>
                {minuteStr}
              </option>
            );
          })}
        </select>

        <select
          value={ampm}
          onChange={(e) => setAmpm(e.target.value)}
          className="w-1/3 p-2 text-xl border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <button
        onClick={handleTimeChange}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg w-full focus:outline-none hover:bg-blue-600"
      >
        Set Time
      </button>
    </div>
  );
};

export default CustomTimePicker;
