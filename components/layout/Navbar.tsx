"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import ToggleTheme from "../lib/ui/toggle-theme";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useRef } from "react";
import { useTheme } from "@/provider/context/ThemeContext";
import Container from "../lib/ui/container";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Button from "../lib/ui/button";

export default function Navbar() {
  const { isOpenSearch, setOpenSearch } = useSearch();
  const { theme } = useTheme();
  const { isToggleMenu, setToggleMenu } = useMenu();
  // const [isVisible, setVisible] = useState(false)
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isToggleMenu) {
      setOpenSearch(false);
    }
  }, [isToggleMenu]);

  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      gsap.to(".navbar", {
        display: "flex",
        onComplete: () => {
          gsap.to(".navbar", {
            height: "100vh",
            duration: 0.7,
            ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
          });
        },
      });
    } else {
      gsap.to(".navbar", {
        height: 0,
        duration: 0.7,
        ease: CustomEase.create("customEase", "0.76, 0, 0.24, 1"),
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
      } navbar justify-start items-start overflow-clip hidden h-0 fixed left-0 top-0 w-screen z-20 flex-col`}
    >
      <Container className="h-[--header-height] p-0 px-[5vw] flex justify-end items-center">
        <Button
          className="uppercase bg-neutral-500 bg-opacity-15 hover:border border-none border-neutral-500
        rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
          name="close"
          handleClick={() => setToggleMenu((prevState) => !prevState)}
        />
      </Container>
      <Container
        className={`transition-all duration-300  w-full relative flex flex-col h-fit gap-y-5 flex-1`}
      >
        <div className="flex flex-col">
          <h1
            style={{ fontFamily: "Montreal Mono, sans-serif" }}
            className=" font-medium uppercase my-1"
          >
            Navigations
          </h1>
          <ul>
            <Links className="text-3xl font-semibold uppercase" />
          </ul>
        </div>
        <div className="flex flex-col flex-1 ">
          <h1
            style={{ fontFamily: "Montreal Mono, sans-serif" }}
            className="w-full relative uppercase font-medium  my-1"
          >
            Socials
          </h1>
          <ul>
            <Social className="text-3xl font-semibold uppercase" />
          </ul>
        </div>
        <Container className="flex flex-col flex-1">
          <ToggleTheme
            className="uppercase"
            label={theme === "dark" ? "dark mode" : "light mode"}
          />
        </Container>
      </Container>
    </nav>
  );
}
