"use client";
import SearchBar from "../features/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "../lib/ui/container";
import { IContentData } from "@/data/content-data";
import { useEffect, useRef } from "react";
import { useSearch } from "@/provider/context/SearchContext";
interface Props {
  contentData: IContentData[];
  placeholder: string;
}
const Search: React.FC<Props> = ({ contentData, placeholder }) => {
  const { isOpenSearch } = useSearch();
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchRef) {
      if (isOpenSearch) {
        gsap.to(searchRef.current, { display: "block" });
      } else {
        gsap.to(searchRef.current, { display: "none", delay: 1 });
      }
    }
  }, [searchRef, isOpenSearch]);

  return (
    <div
      ref={searchRef}
      className={`${
        isOpenSearch ? "h-[--hero-height]" : "h-0"
      } transition-all ease-custom-ease duration-500 w-screen fixed bottom-0 hidden`}
    >
      <Container className="relative w-full justify-center items-center">
        <SearchBar contentData={contentData} placeholder={placeholder} />
      </Container>
    </div>
  );
};

export default Search;
