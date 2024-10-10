"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import Container from "../lib/ui/container";
import ToggleTheme from "../lib/ui/toggle-theme";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { useEffect, useState } from "react";
import Search from "../common/Search";
import { contentData } from "@/data/content-data";

export default function Navbar() {
  const { isOpenSearch } = useSearch();
  const { isToggleMenu } = useMenu();
  const [isVisible, setVisible] = useState(false);

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
      <nav className={`navbar flex relative w-full h-0 text-neutral-50`}>
        {!isOpenSearch && isToggleMenu && isVisible && (
          <Container
            className={`rounded-lg md:p-[2vw] flex flex-col lg:w-[30vw] h-fit 
          gap-y-5`}
          >
            <div>
              <h1 className=" font-medium uppercase my-1">Navigations</h1>
              <ul>
                <Links className="text-lg hover:text-green-500" />
              </ul>
            </div>
            <div className="flex flex-col flex-1 ">
              <h1 className="w-full relative uppercase font-medium my-1">
                Socials
              </h1>
              <ul>
                <Social className="text-lg" />
              </ul>
            </div>
            <div className="flex flex-col flex-1">
              <ToggleTheme />
            </div>
          </Container>
        )}

        {isVisible && isOpenSearch && isToggleMenu && (
          <Container>
            <Search placeholder="Search..." contentData={contentData} />
          </Container>
        )}
      </nav>
    </PageTransitionLayout>
  );
}
