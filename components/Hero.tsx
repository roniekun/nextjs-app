"use client";
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
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
    <div ref={targetRef} className="h-[200vh]">
      <motion.div
        style={{ opacity: sm }}
        className="sticky top-[44px] h-[--hero-height] flex flex-col py-[5vw]"
      >
        <h1 className="text-xl font-medium text-neutral-600">
          Elevate your Creative Vision:
        </h1>
        <h1 className="text-4xl bg-white font-bold ">
          Your Website, Your Platform!
        </h1>
      </motion.div>
    </div>
  );
}
