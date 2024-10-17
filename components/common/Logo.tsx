"use client";
import Link from "next/link";
import Container from "../lib/ui/container";

const Logo = () => {
  return (
    <Container className="p-0 my-1 font-normal text-lg leading-tight ">
      <Link style={{ fontFamily: "Neue Bit, sans-serif" }} href="/">
        R&bull;Next
      </Link>
    </Container>
  );
};

export default Logo;
