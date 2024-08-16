"use client";

import Button from "./Button";
import Logo from "./Logo";
import Search from "./Search";
import Links from "./Links";

const Nav = () => {
  return (
    <nav className="z-10 top-0 w-full flex sticky h-fit px-[5vw] items-center justify-between bg-neutral-950 text-neutral-100">
      <Logo />
      <Search />
      <div className="flex gap-1">
        <Links />
      </div>
    </nav>
  );
};

export default Nav;
