"use client";
import Logo from "../lib/ui/logo";
import Menu from "../common/Menu";
import Container from "../lib/ui/container";

const Header = () => {
  return (
    <header
      className={`header backdrop-blur-lg overflow-hidden h-[--header-height] 
         bg-transparent flex flex-col justify-center w-full sticky z-10 top-0`}
    >
      <Container className="py-0 flex items-center justify-between max-w-[1400px] h-[--header-height]">
        <Logo />

        <Menu />
      </Container>
    </header>
  );
};

export default Header;
