import React from "react";
import Container from "./Container";
import Social from "./Social";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 flex flex-col items-center bottom-0 h-[200px] w-full text-neutral-50">
      <Container className="flex items-center justify-between max-w-[1200px]">
        <Social className="text-sm  hover:text-blue-500 text-neutral-300" />
      </Container>
    </footer>
  );
}
