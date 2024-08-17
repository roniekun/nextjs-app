import React from "react";
import Container from "./Container";
import Social from "./Social";

export default function Footer() {
  return (
    <Container className="bg-neutral-950">
      <footer className="relative flex flex-col bottom-0 h-[200px] w-full text-neutral-50">
        <Social className="text-sm" />
      </footer>
    </Container>
  );
}
