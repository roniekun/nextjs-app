"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

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
    gsap.registerPlugin(CustomEase);
    const buttonHeight = buttonRef.current?.getBoundingClientRect().height;
    const containerHeight = sliderRef.current?.getBoundingClientRect().height;
    setTextHeight(buttonHeight ?? 0);
    setSliderHeight(containerHeight ?? 0);

    gsap.set(sliderRef.current, { top: `-${buttonHeight ?? 0 * 2}px` });

    if (sliderRef && isToggleMenu && buttonRef) {
      gsap.to(sliderRef.current, {
        top: `-${buttonHeight}px`,
        duration: 0.3,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
      });
    } else {
      gsap.to(sliderRef.current, {
        top: "0px",
        duration: 0.3,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        onComplete: () => {
          gsap.set(sliderRef.current, { top: `-${buttonHeight ?? 0 * 2}px` });
        },
      });
    }
  }, [isToggleMenu, sliderRef, buttonRef]);

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
          style={{ height: `${sliderHeight}px`, top: `-${textHeight * 2}px` }}
          className="flex flex-col relative"
        >
          <p
            style={{ height: `${textHeight}px` }}
            className="flex place-items-center"
          >
            Menu
          </p>
          <p
            style={{ height: `${textHeight}px` }}
            className="flex place-items-center"
          >
            Close
          </p>
          <p
            style={{ height: `${textHeight}px` }}
            className="flex place-items-center"
          >
            Menu
          </p>
        </div>
      </button>
    </div>
  );
};
export default Menu;
