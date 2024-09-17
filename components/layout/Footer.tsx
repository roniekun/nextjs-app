"use client";
import Container from "../libs/ui/container";
import Social from "../libs/social";
import Button from "../libs/ui/button";
import EmailTo from "../utils/email";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="relative bg-neutral-950 flex flex-col md:px-[5vw] justify-center item-center bottom-0 h-auto w-full text-neutral-50">
      <Container className="max-w-[1200px]">
        <section className="flex flex-col relative justify-start pb-0">
          <h2 className="lg:text-2xl text-xl font-medium text-neutral-300">
            Thinking of a Project?
          </h2>
          <br />
          <h1 className="text-4xl font-medium uppercase">
            Reach out & Share your visions
          </h1>
          <br />
        </section>

        <section className="flex flex-col gap-y-1">
          <ul className="flex flex-row gap-2 l">
            <Social className="text-base hover:text-blue-500 text-neutral-300" />
          </ul>
          <Button handleClick={EmailTo} name="Say Hello" size="lg" />
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
