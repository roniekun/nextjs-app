"use client";
import React from "react";
import Container from "./Container";
import Social from "./Social";
import Button from "./Button";

export default function Footer() {
  const handleClick = () => {
    const user = {
      email: "roniebenitez01@gmail.com",
      subject: "new project",
    };
    const mailtoUrl = `mailto:${user.email}?subject=${encodeURIComponent(
      user.subject
    )}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <footer className="relative bg-neutral-950 flex flex-col items-center bottom-0 h-[200px] w-full text-neutral-50">
      <Container className="flex items-center justify-between max-w-[1200px]">
        <div className="flex flex-col">
          <Social className="text-sm  hover:text-blue-500 text-neutral-300" />
          <Button handleClick={handleClick} name="Say Hello" size="md" />
        </div>
      </Container>
    </footer>
  );
}
