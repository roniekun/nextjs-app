"use client";
import Link from "next/link";
import Container from "./container";

const Logo = () => {
  return (
    <Container className="p-0 m-1 font-medium uppercase leading-tight">
      <Link href="/">
        RONIE
        <br /> BENITEZ
      </Link>
    </Container>
  );
};

export default Logo;
