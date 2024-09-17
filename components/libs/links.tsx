"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useMenu } from "@/provider/context/MenuContext";

type Props = {
  className?: string;
};

export default function Links({ className }: Props) {
  const { setToggleMenu } = useMenu();
  const linkLists = [
    {
      name: "profile",
      to: "/profile",
    },
    {
      name: "projects",
      to: "/projects",
    },
    {
      name: "contact",
      to: "/contact",
    },
  ];

  const handleClick = () => {
    setToggleMenu(false);
  };

  const links = linkLists.map((item, idx) => (
    <li key={idx} className="flex flex-col">
      <Link
        onClick={handleClick}
        href={item.to}
        className={twMerge(
          "w-fit capitalize hover:text-neutral-200",
          className
        )}
      >
        {item.name}
      </Link>
      {/* <div className="w-full relative h-[1px] bg-slate-50" /> */}
    </li>
  ));

  return links;
}
