"use client";
import React, { useState } from "react";
import { questions as data } from "./data/question";
import { motion, AnimatePresence } from "framer-motion";
import { GrAdd } from "react-icons/gr";
import Container from "@/app/components/lib/ui/container";

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
    <section className="w-full mx-auto my-8 space-y-4">
      <Container className="flex flex-col h-auto w-full md:px-[10vw]">
        <h1 className="mt-5 font-semibold md:text-2xl text-xl relative self-center my-10">
          <span className="">Questions? </span>
          Answer.
        </h1>
        <ul>
          {data.map((item, idx) => (
            <li
              key={idx}
              className={`flex flex-col relative overflow-hidden md:py-4 justify-center 
            bg-opacity-15 border-[--border-color-secondary] border-t ${
              idx === 0 && "border-t-0 pt-2 "
            } `}
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full py-4 px-2 text-left flex justify-between items-center font-medium"
              >
                <span>{item.question}</span>
                <div
                  className={`flex transition-transform duration-300 text-lg mx-2 rounded-md ${
                    activeIndices.includes(idx) && "rotate-45"
                  }`}
                >
                  <GrAdd />
                </div>
              </button>
              <motion.div
                animate={{ height: activeIndices.includes(idx) ? "auto" : "0" }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                className={`overflow-hidden`}
              >
                <AnimatePresence>
                  {activeIndices.includes(idx) && (
                    <motion.p
                      initial={{ y: "-10px", opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{ y: "-10px", opacity: 0 }}
                      transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                      className=" py-4 px-2 opacity-0"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Accordion2;
