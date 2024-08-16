"use client";

import Link from "next/link";

export default function Links() {
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

  const links = linkLists.map((item, idx) => (
    <Link
      key={idx}
      href={item.to}
      className="m-1 w-fit capitalize hover:text-neutral-200"
    >
      {item.name}
    </Link>
  ));

  return <div className="flex gap-1">{links}</div>;
}
