"use client";
import React, { useState } from "react";
import { questions as data } from "./data/question";

const Accordion2 = () => {
  const [activeIndices, setActiveIndices] = useState<(number | null)[]>([]);

  const handleToggle = (index: number) => {
    if (activeIndices.includes(index)) {
      // Remove the index if it's already active (close the accordion)
      const updatedIndeces = activeIndices.filter((i) => i !== index);
      setActiveIndices(updatedIndeces);
    } else {
      // Add the index to the active indices (open the accordion)
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className="w-full mx-auto my-8 space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-[--border-color-secondary] rounded-lg"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full p-4 text-left  focus:outline-none flex justify-between items-center"
          >
            <span>{item.question}</span>
            <span>{activeIndices.includes(index) ? "-" : "+"}</span>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              activeIndices.includes(index) ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion2;
