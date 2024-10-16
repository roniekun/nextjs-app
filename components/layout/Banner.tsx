import React from "react";
import TextSlider from "../lib/ui/marquee";
import ToggleTheme from "../lib/ui/toggle-theme";

const Banner = () => {
  return (
    <div className="w-full top-0 relative flex">
      <h3 className="text-sm text-green-600 font-bold">Active now</h3>
      <TextSlider title=" - Available for freelance work" />
      <ToggleTheme />
    </div>
  );
};

export default Banner;
