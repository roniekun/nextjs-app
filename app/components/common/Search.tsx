"use client";
import SearchBar from "../../features/search/search-bar";
import Container from "../lib/ui/container";
import { IContentData } from "@/data/content-data";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useAppSelector } from "@/app/redux/hooks/hooks";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  contentData: IContentData[];
  placeholder: string;
}
const Search: React.FC<Props> = ({ contentData, placeholder }) => {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const theme = useAppSelector((state) => state.theme);
  const { isOpenSearch } = useAppSelector((state) => state.search);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("customEase", "0.76, 0, 0.24, 1");
    if (searchRef) {
      if (isOpenSearch) {
        gsap.to(searchRef.current, {
          height: "70vh",
          duration: 0.7,
          ease: "customEase",
        });
      } else {
        gsap.to(searchRef.current, {
          height: 0,
          duration: 0.7,
          ease: "customEase",
        });
      }
    }
  }, [searchRef, isOpenSearch]);

  return (
    <AnimatePresence>
      {isOpenSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className="w-full h-full bg-neutral-950 bg-opacity-10 opacity-0"
        >
          <div
            ref={searchRef}
            className={`${
              theme.theme === "dark"
                ? "bg-[--background-dark] text-neutral-200"
                : "bg-neutral-300 text-neutral-900"
            } w-screen overflow-hidden fixed bottom-0 h-0 rounded-t-md`}
          >
            <Container className="relative w-full p-[10vw] justify-center items-center">
              <SearchBar contentData={contentData} placeholder={placeholder} />
            </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;
