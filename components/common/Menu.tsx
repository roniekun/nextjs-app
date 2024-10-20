"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";

const Menu = () => {
  const { setToggleMenu } = useMenu();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const [buttonHeight, setButtonHeight] = useState<number>(0);

  gsap.registerPlugin(CustomEase);

  useLayoutEffect(() => {
    const height = optionRef.current?.getBoundingClientRect().height ?? 0;
    setButtonHeight(height);
  }, [optionRef]);

  const [counter, setCounter] = useState<number>(0);

  const handleClick = () => {
    switch (counter) {
      case 0: //step down, label: "Close"
        console.log(`this should log 0 = ${counter}`);
        setToggleMenu(true);
        gsap.to(sliderRef.current, {
          y: `-${buttonHeight}px`,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          onComplete: () => {
            setCounter((prevCount) => prevCount + 1);
          },
        });
        break;

      case 1: //step down, label: "Menu"
        console.log(`this should log 1 = ${counter}`);
        setToggleMenu(false);
        gsap.to(sliderRef.current, {
          y: 0,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          onComplete: () => {
            gsap.set(sliderRef.current, {
              y: `-${buttonHeight * 2}px`,
            });
            setCounter(0); //reset, label: "Menu"
          },
        });
        break;
      default:
        break;
    }
  };

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
          className="flex flex-col relative overflow-visible -translate-y-2/3"
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
