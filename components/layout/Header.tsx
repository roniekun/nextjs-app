"use client";
import Logo from "../common/Logo";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/provider/context/SearchContext";
import { useMenu } from "@/provider/context/MenuContext";

const Header = () => {
  const { setOpenSearch } = useSearch();
  const { setToggleMenu, isToggleMenu } = useMenu();

  const handleClick = () => {
    setOpenSearch((prevState) => !prevState);
    setToggleMenu(false);
  };

  return (
    <header
      className={`header backdrop-blur-lg overflow-hidden h-[--header-height] 
         bg-transparent flex flex-col justify-center w-full sticky z-20 top-0`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />
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
