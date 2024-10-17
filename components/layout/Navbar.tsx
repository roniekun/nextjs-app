"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useRef } from "react";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { useTheme } from "@/provider/context/ThemeContext";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Button from "../lib/ui/button";
import Container from "../lib/ui/container";
import { useLayout } from "@/provider/context/LayoutContext";

export default function Navbar() {
  const { isOpenSearch, setOpenSearch } = useSearch();
  const { theme } = useTheme();
  const { isToggleMenu, setToggleMenu } = useMenu();
  const { isDesktop } = useLayout();
  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isToggleMenu) {
      setOpenSearch(false);
    }
  }, [isToggleMenu]);

  gsap.registerPlugin(CustomEase);
  const tl = gsap.timeline();
  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      tl.to(".navbar", {
        display: "flex",
        onComplete: () => {
          gsap.to(".navbar", {
            height: isDesktop ? "100vh" : "auto",
            duration: 1,
            ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          });
        },
      });
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 }
        );
      }
    } else {
      gsap.to(".navbar", {
        height: 0,
        duration: 1,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
        onComplete: () => {
          if (navRef.current) {
            navRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isOpenSearch, isToggleMenu, navRef, isDesktop]);

  return (
    <nav
      ref={navRef}
      className={`${
        theme === "dark"
          ? "bg-[--background-dark] text-neutral-200"
          : "bg-[--background-light] text-neutral-900"
      } navbar overflow-hidden hidden h-0 fixed left-0 top-0 w-screen z-20 flex-col lg:place-items-end rounded-b-md shadow-inner`}
    >
      <Container className="h-[--header-height] p-0 px-[5vw] flex justify-end items-center">
        <Button
          className="capitalize bg-neutral-500 bg-opacity-15 hover:border border-none border-neutral-500
        rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
          name="close"
          handleClick={() => setToggleMenu((prevState) => !prevState)}
        />
      </Container>
      <div
        ref={contentRef}
        className="relative opacity-0 lg:max-w-screen-sm flex flex-col h-fit lg:self-end w-full my-[5vw]"
      >
        <Container
          className={`p-0 px-[5vw] relative flex flex-col h-auto text-3xl sm:text-xl `}
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
        </Container>
      </div>
    </nav>
  );
}
