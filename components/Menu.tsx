import React, { useEffect } from "react";
import Button from "./util/button";
import { useContext } from "react";
import { DataContext } from "@/provider/context/DataContext";
import { GrMenu } from "react-icons/gr";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Menu() {
  const { setToggleMenu, isToggleMenu } = useContext(DataContext);
  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
  };

  return (
    <div>
      <Button
        size="sm"
        className="bg-neutral-950 bg-opacity-10  hover:border border-none border-neutral-500 rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300"
        handleClick={handleClick}
      >
        {isToggleMenu ? <RiCloseLargeFill /> : <GrMenu />}
      </Button>
    </div>
  );
}
