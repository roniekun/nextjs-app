"use client";
import Link from "next/link";
import Container from "../lib/ui/container";
import { useMenu } from "@/provider/context/MenuContext";
import { twMerge } from "tailwind-merge";
type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className }) => {
  const { setToggleMenu } = useMenu();

  return (
    <Container className="p-0 my-1 font-normal text-lg leading-tight  ">
      <Link
        onClick={() => setToggleMenu(false)}
        className={twMerge(``, className)}
        style={{ fontFamily: "Neue Bit, sans-serif" }}
        href="/"
      >
        R&bull;Next
      </Link>
    </Container>
  );
};

export default Logo;
