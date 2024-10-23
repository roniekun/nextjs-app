import React from "react";
import { twMerge } from "tailwind-merge";
type SocialProps = {
  className?: string;
};

export default function Social({ className }: SocialProps) {
  const links = [
    { name: "Facebook", url: "http://www.facebook.com/ronieuxjpg" },
    { name: "LinkedIn", url: "http://www.linkedin.com/in/roniebenitez" },
    { name: "Instagram", url: "http://www.instagram.com/ronieuxjpg" },
    { name: "Github", url: "http://www.github.com/roniekun" },
  ];
  const linksItem = links.map((item, idx) => (
    <li key={idx}>
      <a
        className={twMerge("inline-flex", className)}
        target="_blank"
        rel="noopener noreferrer"
        href={item.url}
      >
        {item.name}
      </a>
    </li>
  ));
  return linksItem;
}
