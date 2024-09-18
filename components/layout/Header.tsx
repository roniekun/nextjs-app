"use client";
import Logo from "../libs/ui/logo";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import Menu from "../common/Menu";
import Container from "../libs/ui/container";
import { CiSearch } from "react-icons/ci";
import Search from "../common/Search";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import gsap from "gsap";

const Header = () => {
  const { isToggleMenu, setToggleMenu } = useMenu();
  const { isOpenSearch, setOpenSearch } = useSearch();

  const handleCLick = () => {
    setOpenSearch((prevState) => !prevState);
    setToggleMenu(false);
  };
  useEffect(() => {
    if (isOpenSearch || isToggleMenu) {
      gsap.to(".header", {
        height: "auto",
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

  return (
    <header
      className={`header transition text-neutral-50 bg-neutral-950 duration-700 flex h-auto flex-col justify-center z-10 top-0 w-full fixed`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />
        <div className="relative flex gap-1 justify-center items-center">
          <button onClick={handleCLick}>
            <CiSearch />
          </button>

          <Menu setOpenSearch={setOpenSearch} />
        </div>
      </Container>
      {isOpenSearch && (
        <Container className="py-0 flex items-center justify-between max-w-[1400px]">
          <Search />
        </Container>
      )}
      {isToggleMenu && (
        <Container className="py-0 flex items-center justify-between max-w-[1400px]">
          <Navbar />
        </Container>
      )}
    </header>
  );
};

export default Header;
