"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useLayoutEffect, useEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    if (isToggleMenu) {
      setOpenSearch(false);
    }
  }, [isToggleMenu]);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.backgroundColor =
        theme.theme === "dark" ? "#171717" : "#ffffff";
      navRef.current.style.color =
        theme.theme === "dark" ? "#ffffff" : "#171717";
    }
  }, [theme, navRef]);

  gsap.registerPlugin(CustomEase);
  const tl = gsap.timeline();

  useLayoutEffect(() => {
    if (isToggleMenu) {
      tl.to(".navbar", {
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
          "-=0.5"
        );
      }
    } else {
      tl.to(".navbar", {
        height: 0,
        duration: 0.7,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
      });
    }
  }, [isToggleMenu, navRef, isDesktop, contentRef]);

  return (
    <nav
      ref={navRef}
      className={`navbar overflow-hidden h-0 fixed left-0 top-0 w-screen z-10 flex-col lg:place-items-end rounded-b-md shadow-inner`}
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
