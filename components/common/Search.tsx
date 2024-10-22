"use client";
import SearchBar from "../features/search/search-bar";
import Container from "../lib/ui/container";
import { IContentData } from "@/data/content-data";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useAppSelector } from "@/store/hooks/hooks";

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
    <div
      ref={searchRef}
      className={`${
        theme === "dark"
          ? "bg-[--background-dark] text-neutral-200"
          : "bg-neutral-300 text-neutral-900"
      } w-screen overflow-hidden fixed bottom-0 h-0 rounded-t-md`}
    >
      <Container className="relative w-full p-[10vw] justify-center items-center">
        <SearchBar
          className={`overflow-y-hidden`}
          contentData={contentData}
          placeholder={placeholder}
        />
      </Container>
    </div>
  );
};

export default Search;
