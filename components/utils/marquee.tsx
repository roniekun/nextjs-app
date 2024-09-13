"use client";
import React from "react";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";
import { useRef, useLayoutEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

type Props = {
  className?: string;
  speed?: number;
  title?: string;
};

const TextSlider = ({ title, speed = 0.1, className }: Props) => {
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const firsttextRef = useRef(null);
  const secondtextRef = useRef(null);

  let xProgress = 0;
  const directionRef = useRef(1);

  const animation = () => {
    if (xProgress <= -100) {
      xProgress = 0;
    }
    if (xProgress > 0) {
      xProgress = -100;
    }
    gsap.set(firsttextRef.current, { xPercent: xProgress });
    gsap.set(secondtextRef.current, { xPercent: xProgress });
    xProgress += speed * directionRef.current;
    requestAnimationFrame(animation);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => {
          directionRef.current = e.direction * -1;
        },
      },
    });
  }, []);

  return (
    <div
      ref={sliderContainerRef}
      className={twMerge("overflow-hidden", className)}
    >
      <div
        ref={sliderRef}
        className="relative flex whitespace-nowrap w-fit overflow-hidden"
      >
        <div ref={firsttextRef} className="pr-[1vw] w-fit relative">
          {title}
        </div>
        <div
          ref={secondtextRef}
          className="pr-[1vw] w-fit absolute left-[100%] "
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
