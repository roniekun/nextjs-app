"use client";
import Link from "next/link";
import Container from "../lib/ui/container";

const Logo = () => {
  return (
    <Container className="p-0 my-1 font-semibold uppercase leading-tight">
      <Link href="/">R&bull;N</Link>
    </Container>
  );
};

export default Logo;
