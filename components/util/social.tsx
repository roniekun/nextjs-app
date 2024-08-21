import React from "react";
import { twMerge } from "tailwind-merge";
type SocialProps = {
  className?: string;
};

export default function Social({ className }: SocialProps) {
  const links = [
    { name: "Facebook", to: "http://www.facebook.com/ronieuxjpg" },
    { name: "LinkedIn", to: "http://www.linkedin.com/in/roniebenitez" },
    { name: "Instagram", to: "http://www.instagram.com/ronieuxjpg" },
    { name: "Github", to: "http://www.github.com/roniekun" },
  ];
  const linksItem = links.map((item, idx) => (
    <a
      className={twMerge("inline-flex transition duration-300", className)}
      target="_blank"
      key={idx}
      href={item.to}
    >
      /{item.name}
    </a>
  ));
  return linksItem;
}
