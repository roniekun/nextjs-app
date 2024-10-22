"use client";
import Logo from "../common/Logo";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { FaSearch } from "react-icons/fa";
import { useMenu } from "@/provider/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "@/provider/context/ThemeContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { toggleOpenSearch } from "@/store/slices/searchSlice";

const Header = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { isScrolled } = useTheme();
  // const headerRef = useRef<HTMLDivElement | null>(null);

  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    gsap.to(".header", { opacity: 1, duration: 0.3, delay: 0.1 });
  }, [pathname]);

  useEffect(() => {
    gsap.to(".header", {
      backgroundColor:
        isScrolled && theme == "light" ? "#171717" : "transparent",
      color:
        theme === "dark" || (isScrolled && theme === "light")
          ? "#ffffff"
          : "#171717",
      duration: 0.3,
    });
  }, [isScrolled, theme]);

  const handleOpenSearch = () => {
    dispatch(toggleOpenSearch());
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
              className="bg-neutral-500 bg-opacity-15 p-2 h-8 w-8 fill-current text-current aspect-square cursor-pointer hover:border border-none border-neutral-500 rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
              onClick={handleOpenSearch}
            />
          )}

          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
