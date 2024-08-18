"use client";
import Container from "./util/container";
import Logo from "./util/logo";
import Links from "./util/links";
import { useContext } from "react";
import { DataContext } from "@/provider/context/DataContext";

const Header = () => {
  const { isDesktop } = useContext(DataContext);
  return (
    <header className="flex justify-center z-10 top-0 w-full sticky h-fit bg-neutral-950 text-neutral-100 overflow-hidden">
      <Container className="py-0 flex items-center justify-between max-w-[1200px]">
        <Logo />
        <div className="flex gap-1">
          <Links />
        </div>
      </Container>
    </header>
  );
};

export default Header;
