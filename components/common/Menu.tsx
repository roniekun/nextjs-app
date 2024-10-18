"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState } from "react";
import { CustomEase } from "gsap/CustomEase";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { setOpenSearch } = useSearch();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [textHeight, setTextHeight] = useState<number>(0);
  const [sliderHeight, setSliderHeight] = useState<number>(0);

  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
    setOpenSearch(false);
  };

  useLayoutEffect(() => {
    const buttonHeight = buttonRef.current?.getBoundingClientRect().height ?? 0;
    const containerHeight =
      sliderRef.current?.getBoundingClientRect().height ?? 0;
    setTextHeight(buttonHeight);
    setSliderHeight(containerHeight);
  }, [sliderRef, buttonRef]);

  return (
    <div style={{ fontFamily: "Neue Bit , Mori" }}>
      <button
        ref={buttonRef}
        className="capitalize relative h-8 w-16 text-sm flex justify-center items-center bg-neutral-500 bg-opacity-15 overflow-hidden hover:border border-none border-neutral-500
        rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
        onClick={handleClick}
      >
        <div
          ref={sliderRef}
          style={{ height: `${sliderHeight}px` }}
          className="flex flex-col relative"
        >
          <AnimatePresence mode="wait">
            {isToggleMenu && (
              <motion.p
                initial={{ y: `-${sliderHeight}px`, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                exit={{ y: `${sliderHeight}px`, opacity: 0 }}
                style={{ height: `${textHeight}px`, y: `-${sliderHeight}px` }}
                className="flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 "
              >
                Close
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            {!isToggleMenu && (
              <motion.p
                initial={{ y: `-${sliderHeight}px`, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                exit={{ top: `${sliderHeight}px`, y: 0 }}
                style={{ height: `${textHeight}px`, y: `-${sliderHeight}px` }}
                className="flex place-items-center relative"
              >
                Menu
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};
export default Menu;
