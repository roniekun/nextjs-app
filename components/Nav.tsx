"use client";
import Container from "./Container";
import Logo from "./Logo";
import Links from "./Links";
import { useContext } from "react";
import { DataContext } from "@/provider/context/DataContext";

const Nav = () => {
  const { isDesktop } = useContext(DataContext);
  return (
    <nav className="z-10 top-0 w-full flex sticky h-fit   bg-neutral-950 text-neutral-100 overflow-hidden">
      <Container className="py-0 flex items-center justify-between">
        <Logo />
        <div className="flex gap-1">
          <Links />
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
