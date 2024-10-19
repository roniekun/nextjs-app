"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";

const Menu = () => {
  const { setToggleMenu } = useMenu();
  const { setOpenSearch, isOpenSearch } = useSearch();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(2);

  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
    setOpenSearch(false);

    if (clicks <= 1) {
      setClicks((prev) => prev + 1);
    }
  };

  useLayoutEffect(() => {
    const height = optionRef.current?.getBoundingClientRect().height ?? 0;
    setButtonHeight(height);

    if (sliderRef) {
      if (isOpenSearch) {
        gsap.to(sliderRef.current, {
          y: `-${buttonHeight * 2}px`,
        });
      }

      if (clicks == 0) {
        gsap.set(sliderRef.current, {
          y: `-${buttonHeight * 2}px`,
        });
      }

      gsap.registerPlugin(CustomEase);
      if (clicks == 1) {
        //display close
        gsap.to(sliderRef.current, {
          y: `-${buttonHeight}px`,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        });
      }
      if (clicks == 2) {
        gsap.to(sliderRef.current, {
          y: 0,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          onComplete: () => {
            gsap.set(sliderRef.current, {
              opacity: 1,
              y: `-${buttonHeight * 2}px`,
            });

            setClicks(0);
          },
        });
      }
    }
  }, [sliderRef, optionRef, clicks, isOpenSearch]);

  return (
    <div style={{ fontFamily: "Neue Bit , Mori" }}>
      <button
        style={{ height: `${buttonHeight}px` }}
        className="capitalize overflow-hidden w-fit relative text-sm flex justify-center bg-neutral-500 bg-opacity-15 hover:border border-none border-neutral-500
        rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
        onClick={handleClick}
      >
        <div
          ref={sliderRef}
          className="flex flex-col relative overflow-visible"
        >
          <div
            ref={optionRef}
            className="flex justify-center items-center h-8 w-16"
          >
            Menu
          </div>
          <div className="flex justify-center items-center h-8 w-16 ">
            Close
          </div>
          <div className="flex justify-center items-center h-8 w-16 ">Menu</div>
        </div>
      </button>
    </div>
  );
};
export default Menu;
