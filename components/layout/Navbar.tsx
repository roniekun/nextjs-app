"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Container from "../lib/ui/container";
import { useLayout } from "@/provider/context/LayoutContext";
import { useAppSelector } from "@/store/hooks/hooks";

export default function Navbar() {
  const { setOpenSearch } = useSearch();
  const { isToggleMenu } = useMenu();
  const { isDesktop } = useLayout();
  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (isToggleMenu) {
      setOpenSearch(false);
    }
  }, [isToggleMenu]);

  gsap.registerPlugin(CustomEase);
  const tl = gsap.timeline();

  useEffect(() => {
    if (isToggleMenu) {
      tl.set(".navbar", { display: "flex" }) // Sets the display instantly
        .to(".navbar", {
          height: isDesktop ? "100vh" : "auto",
          duration: 0.7,
          ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        });

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          },
          "-=0.5" // Start this animation 0.5 seconds earlier
        );
      }
    } else {
      tl.to(".navbar", {
        height: 0,
        duration: 0.7,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
      }).set(".navbar", { display: "none" }); // Hide it after shrinking
    }
  }, [isToggleMenu, navRef, isDesktop, contentRef]);

  return (
    <nav
      ref={navRef}
      className={`${
        theme === "dark"
          ? "bg-[--background-dark] text-neutral-200"
          : "bg-[--background-light] text-neutral-900"
      } navbar overflow-hidden hidden h-0 fixed left-0 top-0 w-screen z-10 flex-col lg:place-items-end rounded-b-md shadow-inner`}
    >
      <Container>
        <div
          ref={contentRef}
          className="relative lg:pt-0 pt-[--header-height] opacity-0 lg:max-w-screen-sm flex flex-col h-fit lg:self-end w-full my-[5vw]"
        >
          <div
            className={`p-0 px-[5vw] relative flex flex-col h-auto text-xl md:text-3xl`}
          >
            <div className="flex flex-col space-y-5 ">
              <ul>
                <Links className="font-medium capitalize leading-normal" />
              </ul>
            </div>
            <div className="flex flex-col space-y-5">
              <ul>
                <Social className="font-medium capitalize leading-normal" />
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
