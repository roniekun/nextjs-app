"use client";

import Button from "./Button";
import Logo from "./Logo";
import Links from "./Links";

const Nav = () => {
  return (
    <nav className="top-0 w-full flex fixed h-fit py-2 px-[5vw] items-center justify-between bg-neutral-950 text-neutral-100 backdrop-blur-sm">
      <Logo />
      <div className="flex gap-1">
        <Links />
      </div>
    </nav>
  );
};

export default Nav;
