"use client";
import React, { useState } from "react";
import { questions } from "./utils/data/question";
import Container from "./utils/container";
import { motion } from "framer-motion";
import { GrAdd } from "react-icons/gr";

const Accordion = () => {
  const [isActive, setActive] = useState(questions.map(() => false));

  const handleClick = (idx: number) => {
    setActive((prevArray) => {
      const updatedArray = [...prevArray];
      updatedArray[idx] = !updatedArray[idx];
      return updatedArray;
    });
  };

  return (
    <section className="relative">
      <Container className="flex flex-col h-auto w-full md:px-[10vw]">
        <h1 className="mt-5 font-semibold md:text-2xl text-xl relative self-center my-10 text-neutral-600">
          <span className="text-neutral-900">Questions? </span>
          Answer.
        </h1>
        {questions.map((data, idx) => (
          <div
            key={idx}
            className={`flex flex-col  lg:py-5 py-2 overflow-hidden  justify-center 
          bg-opacity-15 border-gray-300 border-t ${
            idx === 0 && "border-t-0 pt-2"
          } `}
          >
            <div
              key={idx}
              onClick={() => handleClick(idx)}
              className="group flex items-center cursor-pointer my-2 justify-between gap-x-5"
            >
              <h2
                className={` w-full cursor-pointer text-lg font-medium text-left leading-relaxed transition duration-300  ${
                  isActive[idx] && "text-neutral-900s"
                }`}
              >
                {data.question}
              </h2>
              <GrAdd
                className={` flex transition-transform duration-300 text-lg ${
                  isActive[idx] && "rotate-45"
                }`}
              />
            </div>
            <motion.div
              animate={{ height: isActive[idx] ? "auto" : "0" }}
              transition={{ ease: [0.87, 0, 0.13, 1], duration: 0.5 }}
              className="transition h-0 duration-300 rounded-md  self-end"
            >
              <li
                className={`text-lg text-left leading-normal  md:text-lg list-none md:mt-5 mt-3 opacity-0 transition-opacity duration-1000 mb-3  ${
                  isActive[idx] && "opacity-100"
                }`}
              >
                {data.answer}
              </li>
            </motion.div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default Accordion;
