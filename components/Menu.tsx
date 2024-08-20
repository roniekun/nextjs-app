import React, { useEffect } from "react";
import Button from "./util/button";
import { useContext } from "react";
import { DataContext } from "@/provider/context/DataContext";

export default function Menu() {
  const { setToggleMenu, isToggleMenu } = useContext(DataContext);
  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
  };

  useEffect(() => {
    console.log(isToggleMenu);
  }, [isToggleMenu]);

  return (
    <div>
      <Button
        name={isToggleMenu ? "Close" : "Menu"}
        size="sm"
        handleClick={handleClick}
      />
    </div>
  );
}
