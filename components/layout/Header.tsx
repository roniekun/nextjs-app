"use client";
import Logo from "../lib/ui/logo";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const { setToggleMenu } = useMenu();
  const { setOpenSearch } = useSearch();

  const handleCLickSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  return (
    <header
      className={`header backdrop-blur-lg overflow-hidden h-[--header-height] 
         bg-transparent flex flex-col first-letter:justify-center z-20 top-0 w-full fixed`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />
        <div className="relative flex gap-1 justify-center items-center">
          <button onClick={handleCLickSearch} className="mx-2">
            <CiSearch />
          </button>

          <Menu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
