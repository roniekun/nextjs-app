"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState } from "react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";

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

    if (sliderRef) {
      let times = 0;
      gsap.registerPlugin(CustomEase);
      gsap.set(sliderRef.current, { y: `-${buttonHeight * 2}px` });
      if (times <= 2) {
        gsap.to(sliderRef.current, {
          y: `${buttonHeight}px`,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        });
        times++;
      } else {
        gsap.set(sliderRef.current, { y: `-${buttonHeight * 2}px` });
        times = 0;
      }
    }
  }, [sliderRef, buttonRef, sliderRef, isToggleMenu]);

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
          style={{
            height: `${sliderHeight}px`,
            transform: `translateY(-${textHeight * 2}px)`,
          }}
          className="flex flex-col relative "
        >
          <span style={{ height: `${sliderHeight}px` }}>Menu</span>
          <span style={{ height: `${sliderHeight}px` }}>Close</span>
          <span style={{ height: `${sliderHeight}px` }}>Menu</span>
        </div>
      </button>
    </div>
  );
};
export default Menu;
