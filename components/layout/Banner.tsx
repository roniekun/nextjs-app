import React from "react";
import TextSlider from "../lib/ui/text-slider";
import ToggleTheme from "../lib/ui/toggle-theme";

const Banner = () => {
  return (
    <div className="w-screen relative flex px-[5vw] py-1 justify-between gap-2 h-fit bg-neutral-950 bg-opacity-10">
      <div>
        <h3 className="text-green-600 font-bold whitespace-nowrap h-fit">
          Active now
        </h3>
      </div>
      <TextSlider title="Available for freelance work - Available for freelance work - Available for freelance work - Available for freelance work - Available for freelance work -" />
      <ToggleTheme className="h-fit" />
    </div>
  );
};

export default Banner;
