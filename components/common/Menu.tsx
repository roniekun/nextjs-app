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
      <AnimatePresence mode="wait">
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
            {isToggleMenu && (
              <motion.p
                initial={{ top: `-${sliderHeight}px` }}
                animate={{ top: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                exit={{ top: `${sliderHeight}px` }}
                style={{ height: `${textHeight}px`, top: `-${sliderHeight}px` }}
                className="flex place-items-center absolute"
              >
                Close
              </motion.p>
            )}
            {isToggleMenu && (
              <motion.p
                initial={{ top: `-${sliderHeight}px` }}
                animate={{ top: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                exit={{ top: `${sliderHeight}px` }}
                style={{ height: `${textHeight}px`, top: `-${sliderHeight}px` }}
                className="flex place-items-center absolute"
              >
                Menu
              </motion.p>
            )}
          </div>
        </button>
      </AnimatePresence>
    </div>
  );
};
export default Menu;
