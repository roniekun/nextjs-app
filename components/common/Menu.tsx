"use client";
import { useMenu } from "@/provider/context/MenuContext";
import { useSearch } from "@/provider/context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const { setToggleMenu, isToggleMenu } = useMenu();
  const { setOpenSearch } = useSearch();
  const handleClick = () => {
    setToggleMenu((prevState: boolean) => !prevState);
    setOpenSearch(false);
  };

  return (
    <div style={{ fontFamily: "Neue Bit , Mori" }}>
      <button
        className="uppercase h-10 w-20 text-xs flex justify-center items-center bg-neutral-500 bg-opacity-15 overflow-hidden hover:border border-none border-neutral-500
         rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
        onClick={handleClick}
      >
        <div className="flex flex-col justify-center items-center relative">
          <AnimatePresence mode="wait" initial={false}>
            {isToggleMenu && (
              <motion.p
                initial={{ y: "-100%" }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="relative"
              >
                Close
              </motion.p>
            )}
            {!isToggleMenu && (
              <motion.p
                initial={{ y: "-10 " }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                animate={{ y: 0 }}
                exit={{ y: "10" }}
                className="relative"
              >
                Menu
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};
export default Menu;
