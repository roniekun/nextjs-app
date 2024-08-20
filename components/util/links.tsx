"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { DataContext } from "@/provider/context/DataContext";

type Props = {
  className?: string;
};

export default function Links({ className }: Props) {
  const { setToggleMenu } = useContext(DataContext);
  const linkLists = [
    {
      name: "profile",
      to: "/profile",
    },
    {
      name: "projects",
      to: "/projects",
    },
  ];

  const handleClick = () => {
    setToggleMenu(false);
  };

  const links = linkLists.map((item, idx) => (
    <div className="flex gap-1 flex-col">
      <Link
        key={idx}
        onClick={handleClick}
        href={item.to}
        className={twMerge(
          "m-1 w-fit capitalize hover:text-neutral-200",
          className
        )}
      >
        {item.name}
      </Link>
    </div>
  ));

  return links;
}
