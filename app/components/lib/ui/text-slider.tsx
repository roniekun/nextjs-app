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

const TextSlider: React.FC<Props> = ({ title, speed = 0.1, className }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const firsttextRef = useRef<HTMLDivElement | null>(null);
  const secondtextRef = useRef<HTMLDivElement | null>(null);

  let xProgress = 0;
  const directionRef = useRef(1);

  const animation = () => {
    if (xProgress <= -100) {
      xProgress = 0;
    }
    if (xProgress > 0) {
      xProgress = -100;
    }
    if (firsttextRef && secondtextRef) {
      gsap.set(firsttextRef.current, { xPercent: xProgress });
      gsap.set(secondtextRef.current, { xPercent: xProgress });
    }
    xProgress += speed * directionRef.current;
    requestAnimationFrame(animation);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const instanceOfAnimation = requestAnimationFrame(animation);
    if (sliderRef) {
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
    }
    return () => {
      // ScrollTrigger.kill(); // or ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cancelAnimationFrame(instanceOfAnimation);
    };
  }, [sliderRef]);

  return (
    <div className={twMerge("overflow-hidden", className)}>
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
