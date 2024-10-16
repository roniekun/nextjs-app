import Button from "../lib/ui/button";
import { useMenu } from "@/provider/context/MenuContext";
import { GrMenu } from "react-icons/gr";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSearch } from "@/provider/context/SearchContext";

const Menu = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { setOpenSearch } = useSearch();
  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
    setOpenSearch(false);
  };

  return (
    <div>
      <Button
        size="md"
        name="menu"
        className=" bg-neutral-500 bg-opacity-15 hover:border border-none border-neutral-500
         rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300"
        handleClick={handleClick}
      />
    </div>
  );
};
export default Menu;
