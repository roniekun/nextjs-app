"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import ToggleTheme from "../lib/ui/toggle-theme";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/provider/context/ThemeContext";
import Search from "../common/Search";
import { contentData } from "@/data/content-data";
import gsap from "gsap";
export default function Navbar() {
  const { isOpenSearch, setOpenSearch } = useSearch();
  const { theme } = useTheme();
  const { isToggleMenu } = useMenu();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isToggleMenu) {
      setOpenSearch(false);
    }
  }, [isToggleMenu]);

  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      gsap.to(".navbar", {
        display: "flex",
        onComplete: () => {
          gsap.to(".navbar", {
            opacity: 1,
            ease: "power2.out", //https://easings.net/#easeInOutQuart,
          });
        },
      });
    } else {
      gsap.to(".navbar", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (navRef.current) {
            navRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isOpenSearch, isToggleMenu, navRef]);

  return (
    <nav
      ref={navRef}
      className={`${
        theme === "dark"
          ? "bg-[--background-dark] text-neutral-200"
          : "bg-[--background-light] text-neutral-900"
      } navbar justify-between items-start overflow-clip hidden fixed h-[100vh] left-0 top-0 w-screen z-10`}
    >
      <PageTransitionLayout>
        {isToggleMenu && (
          <div
            className={`mt-[--header-height] lg:max-w-7xl p-[5vw]  w-full relative flex flex-col h-fit gap-y-5`}
          >
            <div>
              <h1 className=" font-medium uppercase my-1">Navigations</h1>
              <ul>
                <Links className="text-3xl font-medium" />
              </ul>
            </div>
            <div className="flex flex-col flex-1 ">
              <h1 className="w-full relative uppercase font-medium my-1">
                Socials
              </h1>
              <ul>
                <Social className="text-3xl font-medium" />
              </ul>
            </div>
            <div className="flex flex-col flex-1">
              <ToggleTheme />
            </div>
          </div>
        )}

        {isOpenSearch && (
          <div className="mt-[--header-height] ">
            <Search placeholder="Search..." contentData={contentData} />
          </div>
        )}
      </PageTransitionLayout>
    </nav>
  );
}
