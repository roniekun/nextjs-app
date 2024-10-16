import React from "react";
import TextSlider from "../lib/ui/text-slider";
import ToggleTheme from "../lib/ui/toggle-theme";
import Container from "../lib/ui/container";

const Banner = () => {
  return (
    <div className="w-screen top-0 relative flex">
      <Container>
        <h3 className="text-sm text-green-600 font-bold">Active now</h3>
        <TextSlider title=" - Available for freelance work" />
        <ToggleTheme />
      </Container>
    </div>
  );
};

export default Banner;
