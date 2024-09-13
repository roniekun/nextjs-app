"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useTheme } from "@/provider/context/ThemeContext";
import Links from "./utils/links";
import Social from "./utils/social";
import Container from "./utils/container";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import ToggleTheme from "./utils/toggle-theme";

export default function Navbar() {
  const { isToggleMenu } = useMenu();

  const theme = "bg-neutral-200 text-neutral-950";

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
        className={`bg-neutral-950 bg-opacity-80 hidden h-screen rounded-b-sm justify-center 
      backdrop-blur-3xl target w-screen fixed left-0 top-[--header-height] z-30  overflow-clip`}
      >
        <Container
          className={`${theme} rounded-lg md:p-[2vw] container scale-75 absolute top-[--header-height] 
        lg:right-[10vw] right-[5vw] flex flex-col lg:w-[30vw] sm:w-[50vw] w-[70%] h-fit overflow-hidden
         gap-y-5 opacity-0`}
        >
          <div>
            <Container className="w-full  p-0 relative bg-neutral-300 rounded-sm">
              <h1 className=" font-medium my-1">Navigations</h1>
            </Container>
            <ul>
              <Links className="text-base " />
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
              <span>Theme</span>
            </Container>
            <ToggleTheme />
          </div>
        </Container>
      </nav>
    </>
  );
}
