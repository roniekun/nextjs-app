import Button from "./utils/button";
import { useMenu } from "@/provider/context/MenuContext";
import { GrMenu } from "react-icons/gr";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Menu() {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
  };

  return (
    <div>
      <Button
        size="sm"
        className=" bg-neutral-500 bg-opacity-15 hover:border border-none border-neutral-500
         rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300"
        handleClick={handleClick}
      >
        {isToggleMenu ? <RiCloseLargeFill /> : <GrMenu />}
      </Button>
    </div>
  );
}
