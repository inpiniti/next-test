import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const increment = () => {
    onChange(value + (step || 1));
  };

  const decrement = () => {
    onChange(value - (step || 1));
  };

  return (
    <div
      className={`flex justify-between items-center ${className} border rounded-md h-9 shadow-sm px-1 ${
        isFocused ? "ring-1 ring-neutral-700" : ""
      }`}
    >
      <div
        className="p-2 cursor-pointer bg-transparent hover:bg-input rounded"
        onClick={decrement}
      >
        <FaChevronLeft />
      </div>
      <input
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="text-center border-0 text-sm w-full h-full outline-none bg-transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div
        className="p-2 cursor-pointer bg-transparent hover:bg-input rounded"
        onClick={increment}
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default NumberField;
