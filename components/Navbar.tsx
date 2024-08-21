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
        height: "auto",
        ease: "power2.in",
      });
    } else {
      gsap.to(".target", {
        height: 0,
        ease: "power2.out",
      });
    }
  }, [isToggleMenu]);

  return (
    <>
      <nav className="flex rounded-b-sm justify-center bg-opacity-80 backdrop-blur-3xl target w-screen fixed left-0 top-[--header-height] z-30 h-0 bg-black overflow-clip">
        <Container className="max-w-[1200px] h-fit">
          <div>
            <Links className="text-neutral-50 hover:text-neutral-200 transition-all duration-300 text-3xl font-medium" />
          </div>
          <div>
            <Social />
          </div>
        </Container>
      </nav>
    </>
  );
}
