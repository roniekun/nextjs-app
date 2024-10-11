"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import Container from "../lib/ui/container";
import ToggleTheme from "../lib/ui/toggle-theme";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useState } from "react";
import { useTheme } from "@/provider/context/ThemeContext";
import Search from "../common/Search";
import { contentData } from "@/data/content-data";
import gsap from "gsap";

export default function Navbar() {
  const { isOpenSearch } = useSearch();
  const { theme } = useTheme();
  const { isToggleMenu } = useMenu();
  const [isVisible, setVisible] = useState(false);

  // useLayoutEffect(() => {
  //   if (isOpenSearch) {
  //     setToggleMenu(true);
  //   }
  // }, [isOpenSearch]);

  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      setTimeout(() => {
        setVisible(true);
      }, 300);
      gsap.to(".navbar", {
        height: "100vh",
        duration: 0.3,
        ease: "cubic-bezier(0.76, 0, 0.24, 1)", //https://easings.net/#easeInOutQuart
      });
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 300);
      gsap.to(".navbar", {
        height: 0,
        duration: 0.3,
        ease: "cubic-bezier(0.76, 0, 0.24, 1)",
      });
    }
  }, [isOpenSearch, isToggleMenu]);

  return (
    <PageTransitionLayout>
      <nav
        className={`${
          theme === "dark"
            ? "bg-[--background-dark] text-[--text-light-color-primary]"
            : "bg-[--background-light] text-[--text-dark-color-primary]"
        } navbar flex justify-between items-center overflow-clip fixed left-0 top-0 w-screen h-0 z-10`}
      >
        {!isOpenSearch && isVisible && (
          <div
            className={`mt-[--header-height] lg:max-w-7xl rounded-lg md:p-[2vw] w-full relative flex flex-col h-fit gap-y-5`}
          >
            <div>
              <h1 className=" font-medium uppercase my-1">Navigations</h1>
              <ul>
                <Links className="text-3xl" />
              </ul>
            </div>
            <div className="flex flex-col flex-1 ">
              <h1 className="w-full relative uppercase font-medium my-1">
                Socials
              </h1>
              <ul>
                <Social className="text-3xl" />
              </ul>
            </div>
            <div className="flex flex-col flex-1">
              <ToggleTheme />
            </div>
          </div>
        )}

        {isVisible && isOpenSearch && (
          <Container>
            <Search placeholder="Search..." contentData={contentData} />
          </Container>
        )}
      </nav>
    </PageTransitionLayout>
  );
}
