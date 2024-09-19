"use client";
import Logo from "../lib/ui/logo";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { CiSearch } from "react-icons/ci";
import Search from "../common/Search";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import gsap from "gsap";

const Header = () => {
  const { isToggleMenu, setToggleMenu } = useMenu();
  const { isOpenSearch, setOpenSearch } = useSearch();
  const [isVisible, setVisible] = useState(false);

  const handleCLickSearch = () => {
    setOpenSearch((prevState) => !prevState);
    setToggleMenu(false);
  };
  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      gsap.to(".header", {
        height: "100vh",
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(".header", {
        height: "55px",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpenSearch, isToggleMenu]);

  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      setTimeout(() => {
        setVisible(true);
      }, 700);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 700);
    }
  }, [isOpenSearch, isToggleMenu]);

  return (
    <header
      className={`header backdrop-blur-3xl overflow-hidden h-[--header-height] text-neutral-50 bg-neutral-950 flexflex-col
         justify-center z-10 top-0 w-full fixed`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />
        <div className="relative flex gap-1 justify-center items-center">
          <button onClick={handleCLickSearch} className="mx-1">
            <CiSearch />
          </button>

          <Menu />
        </div>
      </Container>
      <Container className="py-0 flex items-center justify-between max-w-[1400px] mb-[--header-height]">
        {isOpenSearch && isVisible && <Search />}
        {isToggleMenu && isVisible && <Navbar />}
      </Container>
    </header>
  );
};

export default Header;
