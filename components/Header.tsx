"use client";
import Container from "./utils/container";
import Logo from "./utils/logo";
// import Links from "./utils/links";
import Menu from "./Menu";
import SearchBar from "./utils/search/search-bar";
import { useMenu } from "@/provider/context/MenuContext";

const Header = () => {
  const { isToggleMenu } = useMenu();
  return (
    <header
      className={`${
        isToggleMenu
          ? "bg-opacity-80 bg-black backdrop-blur-3xl"
          : "bg-neutral-950"
      } transition duration-700 flex justify-center z-10 top-0 w-full sticky
    text-neutral-50 overflow-hidden h-[--header-height]`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1200px]">
        <Logo />
        <div className="relative flex gap-1">
          {/* {isDesktop && <Links />} */}
          <SearchBar />
          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
