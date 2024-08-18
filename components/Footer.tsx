"use client";
import React from "react";
import Container from "./Container";
import Social from "./Social";
import Button from "./Button";
import EmailTo from "./EmailTo";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 flex flex-col items-center bottom-0 h-[200px] w-full text-neutral-50">
      <Container className="flex items-center justify-between max-w-[1200px]">
        <div className="flex flex-col">
          <Social className="text-sm  hover:text-blue-500 text-neutral-300" />
          <Button handleClick={EmailTo} name="Say Hello" size="md" />
        </div>
      </Container>
    </footer>
  );
}
