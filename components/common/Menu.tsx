"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Menu = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { setOpenSearch } = useSearch();
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
    setOpenSearch(false);
  };

  useLayoutEffect(() => {
    if (sliderRef && isToggleMenu) {
      gsap.to(sliderRef.current, { y: "-33.33%", duration: 0.3 });
    } else {
      gsap.to(sliderRef.current, {
        y: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(sliderRef.current, { y: "-100%" });
        },
      });
    }
  }, [isToggleMenu, sliderRef]);

  return (
    <div style={{ fontFamily: "Neue Bit , Mori" }}>
      <button
        className="capitalize relative h-8 w-16 text-sm flex justify-center items-center bg-neutral-500 bg-opacity-15 overflow-hidden hover:border border-none border-neutral-500
         rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
        onClick={handleClick}
      >
        <div
          ref={sliderRef}
          className="flex flex-col justify-between items-center leading-none relative h-24 transform -translate-y-[66.66%]"
        >
          <p>Menu</p>
          <p>Close</p>
          <p>Menu</p>
        </div>
      </button>
    </div>
  );
};
export default Menu;
