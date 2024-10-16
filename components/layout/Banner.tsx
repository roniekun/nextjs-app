import React from "react";
import TextSlider from "../lib/ui/text-slider";
import ToggleTheme from "../lib/ui/toggle-theme";

const Banner = () => {
  return (
    <div className="w-screen relative flex px-[5vw] py-1 justify-between gap-2 h-fit bg-neutral-950 bg-opacity-10">
      <div className="rounded-md">
        <h3
          style={{ fontFamily: "Montreal-Mono, sans-serif" }}
          className="text-green-600 font-bold uppercase whitespace-nowrap h-fit"
        >
          Active now
        </h3>
      </div>
      <TextSlider
        className="rounded-md"
        title="Available for freelance work - Available for freelance work - Available for freelance work - Available for freelance work - Available for freelance work -"
      />
      <ToggleTheme className="h-fit rounded-md" />
    </div>
  );
};

export default Banner;
