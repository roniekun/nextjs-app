"use client";
import React from "react";
import Container from "./util/container";
import Social from "./util/social";
import Button from "./util/button";
import EmailTo from "./util/email";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="relative bg-neutral-950 flex flex-col md:px-[5vw] justify-center item-center bottom-0 h-auto w-full text-neutral-50">
      <Container className="max-w-[1200px]">
        <section className="flex flex-col relative justify-start pb-0">
          <h2 className="text-2xl font-medium text-neutral-300">
            Thinking of a Project?
          </h2>
          <br />
          <h1 className="text-4xl font-medium uppercase">
            Reach out & Share your visions
          </h1>
          <br />
        </section>

        <section className="flex flex-col">
          <div className="flex flex-col gap-1">
            <Social className="text-base hover:text-blue-500 text-neutral-300" />
            <Button handleClick={EmailTo} name="Say Hello" size="lg" />
          </div>
        </section>
        <section className="flex flex-col md:justify-end font-medium md:items-end py-5">
          <h3 className="capitalize">all rights reserved</h3>
          <h3 className="text-neutral-300 ">
            roniecode&copy;{date.getFullYear()}
          </h3>
        </section>
      </Container>
    </footer>
  );
}
