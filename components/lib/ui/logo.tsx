"use client";
import Link from "next/link";
import Container from "./container";

const Logo = () => {
  return (
    <Container className="p-0 my-1 font-medium uppercase leading-tight">
      <Link href="/">ronie-next</Link>
    </Container>
  );
};

export default Logo;
