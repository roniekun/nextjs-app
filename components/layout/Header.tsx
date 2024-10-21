"use client";
import Logo from "../common/Logo";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "@/provider/context/ThemeContext";

const Header = () => {
  const { setOpenSearch } = useSearch();
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { isScrolled, theme } = useTheme();
  // const headerRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    gsap.to(".header", { opacity: 1, duration: 0.3, delay: 0.1 });
  }, [pathname]);

  useEffect(() => {
    if (isScrolled && theme === "light") {
      gsap.to(".header", {
        backgroundColor: "#171717",
        color: "#ffffff",
        duration: 0.3,
      });
    } else {
      gsap.to(".header", {
        backgroundColor: "transparent",
        color: "#171717",
        duration: 0.3,
      });
    }
  }, [isScrolled, theme]);

  const handleClick = () => {
    setOpenSearch((prevState) => !prevState);
    setToggleMenu(false);
  };

  return (
    <header
      className={`header backdrop-blur-lg overflow-hidden h-[--header-height] 
         bg-transparent flex flex-col justify-center w-full sticky z-20 top-0 opacity-0`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo className={`${isToggleMenu && "pointer-events-none"}`} />
        <div className="flex gap-2 justify-center items-center">
          {!isToggleMenu && (
            <FaSearch
              type="button"
              className="rounded-md bg-neutral-950 bg-opacity-10 p-2 h-8 w-8 fill-current text-current aspect-square cursor-pointer"
              onClick={handleClick}
            />
          )}

          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
