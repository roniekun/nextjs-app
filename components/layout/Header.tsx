"use client";
import Logo from "../libs/ui/logo";
import { useMenu } from "@/provider/context/MenuContext";
import Menu from "../common/Menu";
import Container from "../libs/ui/container";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import Search from "../common/Search";
import { useState } from "react";

const Header = () => {
  const { isToggleMenu, setToggleMenu } = useMenu();
  const [isOpenSearch, setOpenSearch] = useState<boolean>(false);

  const handleCLick = () => {
    setOpenSearch((prevState) => !prevState);
  };
  return (
    <header
      className={`${
        isToggleMenu
          ? "bg-opacity-80 bg-black backdrop-blur-3xl"
          : "bg-neutral-950"
      } transition duration-700 flex  flex-col justify-center z-10 top-0 w-full sticky
    text-neutral-50 overflow-visible h-[--header-height]`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px]">
        <Logo />
        <div className="relative flex gap-1 justify-center items-center">
          <button onClick={handleCLick}>
            <CiSearch />
          </button>

          <Menu />
        </div>
      </Container>
      {isOpenSearch && (
        <Container className="py-0 flex items-center justify-between max-w-[1400px]">
          <Search />
        </Container>
      )}
    </header>
  );
};

export default Header;
