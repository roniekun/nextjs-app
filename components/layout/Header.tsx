"use client";
import Logo from "../common/Logo";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/provider/context/SearchContext";

const Header = () => {
  const { setOpenSearch } = useSearch();

  const handleClick = () => {
    setOpenSearch((prevState) => !prevState);
  };

  return (
    <header
      className={`header backdrop-blur-lg overflow-hidden h-[--header-height] 
         bg-transparent flex flex-col justify-center w-full sticky z-20 top-0`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />
        <div className="flex gap-1">
          <FaSearch onClick={handleClick} />
          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
