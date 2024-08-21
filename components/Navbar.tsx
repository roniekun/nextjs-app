"use client";
import { DataContext } from "@/provider/context/DataContext";
import Links from "./util/links";
import Social from "./util/social";
import Container from "./util/container";
import { useContext, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const { isToggleMenu } = useContext(DataContext);

  useLayoutEffect(() => {
    if (isToggleMenu) {
      gsap.to(".target", {
        height: () => `${window.innerHeight - 44}px`,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(".container", { opacity: 1, delay: 0.3 });
        },
      });
    } else {
      gsap.to(".target", {
        height: 0,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".container", { opacity: 0 });
        },
      });
    }
  }, [isToggleMenu]);

  return (
    <>
      <nav className="flex rounded-b-sm justify-center bg-opacity-80 backdrop-blur-3xl target w-screen fixed left-0 top-[--header-height] z-30 h-0 bg-black overflow-clip">
        <Container className="container flex flex-col max-w-[1200px] h-[--hero-height] overflow-hidden opacity-0">
          <div>
            <Links className="text-neutral-50 hover:text-neutral-200 transition-all duration-300 text-3xl font-medium" />
          </div>
          <div className="flex flex-col justify-end flex-1 mb-10">
            <Social className=" text-neutral-50 text-base font-thin" />
          </div>
        </Container>
      </nav>
    </>
  );
}
