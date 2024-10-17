"use client";
import { useState, useLayoutEffect } from "react";
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
        className="uppercase px-4 py-2 flex justify-center items-center bg-neutral-500 bg-opacity-15 overflow-hidden hover:border border-none border-neutral-500
         rounded-md hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] transition-shadow duration-300 z-10"
        onClick={handleClick}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isToggleMenu && (
            <motion.p
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative"
            >
              Close
            </motion.p>
          )}
          {isToggleMenu && (
            <motion.p
              initial={{ y: "-10 " }}
              animate={{ y: 0 }}
              exit={{ y: "10" }}
              className="relative"
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
export default Menu;
