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
      backdrop-blur-3xl w-full h-auto overflow-clip`}
      >
        <Container
          className={`rounded-lg md:p-[2vw] container scale-75 absolute top-[--header-height] 
        lg:right-[10vw] right-[5vw] flex flex-col lg:w-[30vw] sm:w-[50vw] w-[70%] h-fit overflow-hidden
         gap-y-5 opacity-0`}
        >
          <div>
            <Container className="w-full  p-0 relativerounded-sm">
              <h1 className=" font-medium my-1">Navigations</h1>
            </Container>
            <ul>
              <Links className="text-base " />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <Container className="w-full  p-0 relativerounded-sm">
              <h1 className="w-full relativefont-medium my-1">Socials</h1>
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
