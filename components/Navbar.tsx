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
        display: "flex",
      });
      gsap.to(".container", {
        opacity: 1,
        duration: 0.1,
        scale: 1,
      });
    } else {
      gsap.to(".target", {
        display: "none",
        duration: 0.1,
      });
      gsap.to(".container", { opacity: 0, duration: 0.1, scale: 0.7 });
    }
  }, [isToggleMenu]);

  return (
    <>
      <nav
        className="hidden text-neutral-950 h-screen rounded-b-sm justify-center 
      backdrop-blur-3xl target w-screen fixed left-0 top-[--header-height] z-30  bg-black overflow-clip"
      >
        <Container
          className="rounded-lg md:p-[2vw] container scale-75 absolute top-[--header-height] 
        lg:right-[10vw] right-[5vw] flex flex-col lg:w-[30vw] sm:w-[50vw] w-[70%] h-fit overflow-hidden
         gap-y-5 opacity-0 bg-neutral-200"
        >
          <div>
            <Container className="w-full  p-0 relative bg-neutral-300 rounded-sm">
              <h1 className=" font-medium my-1">Navigations</h1>
            </Container>
            <ul>
              <Links className=" hover:text-black transition-all duration-300 text-base " />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <Container className="w-full  p-0 relative bg-neutral-300 rounded-sm">
              <h1 className="w-full relative bg-neutral-300 font-medium my-1">
                Socials
              </h1>
            </Container>
            <ul>
              <Social className="text-base hover:text-black" />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <Container className="w-full  p-0 relative bg-neutral-300 rounded-sm">
              <h1 className="w-full relative bg-neutral-300 font-medium my-1">
                Theme
              </h1>
            </Container>
          </div>
        </Container>
      </nav>
    </>
  );
}
