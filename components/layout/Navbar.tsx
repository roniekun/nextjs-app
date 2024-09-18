"use client";
import Links from "../libs/links";
import Social from "../libs/social";
import Container from "../libs/ui/container";
import ToggleTheme from "../libs/ui/toggle-theme";

export default function Navbar() {
  return (
    <>
      <nav
        className={`bg-neutral-950 bg-opacity-80 hidden rounded-b-sm justify-center 
      backdrop-blur-3xl w-full h-auto`}
      >
        <Container
          className={`rounded-lg md:p-[2vw] flex flex-col lg:w-[30vw] h-fit 
         gap-y-5 opacity-0`}
        >
          <div>
            <Container className="w-full  p-0 relative rounded-sm">
              <h1 className=" font-medium my-1">Navigations</h1>
            </Container>
            <ul>
              <Links className="text-base " />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <Container className="w-full  p-0 relative rounded-sm">
              <h1 className="w-full relative font-medium my-1">Socials</h1>
            </Container>
            <ul>
              <Social className="text-base" />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <ToggleTheme />
          </div>
        </Container>
      </nav>
    </>
  );
}
