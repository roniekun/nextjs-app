"use client";
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import Button from "../lib/ui/button";
import EmailTo from "../util/email";

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const sm: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0]
  );

  const md: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0]
  );

  return (
    <div ref={targetRef} className="h-[200vh] w-full ">
      <motion.div
        style={{ opacity: sm }}
        className="sticky top-[--header-height] h-[--hero-height] flex flex-col py-[5vw]"
      >
        <h1 className="text-xl font-medium text-[--text-color-muted]">
          Elevate your Creative Vision:
        </h1>
        <h1 className="text-4xl font-bold ">Your Website, Your Platform!</h1>
        <br />
        <Button
          className="font-medium border-2 rounded-md border-[--border-color-secondary] bg-opacity-5 bg-neutral-950"
          name="roniebenitez01@gmail.com"
          size="lg"
          handleClick={EmailTo}
        />
      </motion.div>
    </div>
  );
}
