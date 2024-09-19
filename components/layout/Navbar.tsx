"use client";
import Links from "../lib/links";
import Social from "../lib/social";
import Container from "../lib/ui/container";
import ToggleTheme from "../lib/ui/toggle-theme";
import PageTransitionLayout from "@/provider/PageTransitionLayout";

export default function Navbar() {
  return (
    <PageTransitionLayout>
      <nav className={`flex relative w-full h-auto text-neutral-50`}>
        <Container
          className={`rounded-lg md:p-[2vw] flex flex-col lg:w-[30vw] h-fit 
          gap-y-5`}
        >
          <div>
            <Container className="w-full  p-0 relative text-xs">
              <h1 className=" font-medium uppercase my-1">Navigations</h1>
            </Container>
            <ul>
              <Links className="text-lg" />
            </ul>
          </div>
          <div className="flex flex-col flex-1 ">
            <Container className="w-full  p-0 relative text-xs">
              <h1 className="w-full relative uppercase font-medium my-1">
                Socials
              </h1>
            </Container>
            <ul>
              <Social className="text-lg" />
            </ul>
          </div>
          <div className="flex flex-col flex-1">
            <ToggleTheme />
          </div>
        </Container>
      </nav>
    </PageTransitionLayout>
  );
}
