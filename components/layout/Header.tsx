"use client";
import Logo from "../libs/ui/logo";
import { useMenu } from "@/provider/context/MenuContext";
import Menu from "../common/Menu";
import Search from "../common/Search";
import Container from "../libs/ui/container";

const Header = () => {
  const { isToggleMenu } = useMenu();
  return (
    <header
      className={`${
        isToggleMenu
          ? "bg-opacity-80 bg-black backdrop-blur-3xl"
          : "bg-neutral-950"
      } transition duration-700 flex justify-center z-10 top-0 w-full sticky
    text-neutral-50 overflow-visible h-[--header-height]`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px]">
        <Logo />
        <div className="relative flex gap-1 justify-center items-center">
          <Search />
          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
