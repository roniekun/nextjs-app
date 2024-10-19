"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";

const Menu = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { setOpenSearch, isOpenSearch } = useSearch();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const [counter, setCounter] = useState<number>(2);

  gsap.registerPlugin(CustomEase);

  useLayoutEffect(() => {
    const height = optionRef.current?.getBoundingClientRect().height ?? 0;
    setButtonHeight(height);
  }, [optionRef]);

  useEffect(() => {
    if (isToggleMenu && isOpenSearch && counter == 1) {
      setToggleMenu(false);
      gsap.to(sliderRef.current, {
        duration: 0.3,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        y: `-${buttonHeight * 2}px`,
        onComplete: () => {
          setCounter(2);
        },
      });
    }
  }, [isToggleMenu, isOpenSearch, counter]);

  const handleClick = () => {
    if (counter < 2) {
      setCounter((prevCount) => prevCount + 1);
    } else {
      setCounter(0);
    }

    switch (counter) {
      case 0:
        gsap.to(sliderRef.current, {
          y: 0,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          onComplete: () => {
            gsap.set(sliderRef.current, {
              y: `-${buttonHeight * 2}px`,
            });
            setCounter(0);
          },
        });
        break;

      case 1:
        gsap.to(sliderRef.current, {
          y: `-${buttonHeight}px`,
          duration: 0.3,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        });

        setToggleMenu(true);

        break;

      case 2:
        setToggleMenu(false);
        gsap.set(sliderRef.current, {
          opacity: 1,
          y: `-${buttonHeight * 2}px`,
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
