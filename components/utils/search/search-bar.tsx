"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Container from "../container";
import { useRouter } from "next/navigation";
import { useSearch, SearchItemProps } from "@/provider/context/SearchContext";
import { twMerge } from "tailwind-merge";
import {
  SearchSuggestionModal,
  filteredResultProps,
} from "./search-suggestion";
import SearchHistoryModal from "./search-history";
import { contentData, IContentData } from "../data/content-data";

type SearchProps = {
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();
  const { isInFocus, setInFocus, setSearchItem, searchItems, setQuery, query } =
    useSearch();

  const [filteredResult, setFilteredResult] = useState<filteredResultProps[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  //input logic setting the query and suggestion result
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredQuery = e.target.value.trim().toLowerCase();
      setQuery(e.target.value);
      const filteredData = contentData.filter((data) => {
        return data.title.toLowerCase().trim().includes(enteredQuery);
      });
      setFilteredResult(filteredData);
    }
    return setFilteredResult([]);
  };

  const handleSearch = () => {
    if (query) {
      const trimQuery = query.trim();
      const newItem: SearchItemProps = {
        history: trimQuery,
        status: "default",
      };
      setSearchItem((prevItems) => [...prevItems, newItem]);
      setInFocus(false);
      router.push(`/search?query=${encodeURIComponent(trimQuery)}`);
    }

    setQuery(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery(null);
  };

  return (
    <div className={twMerge(`flex relative flex-col`, className)}>
      <Container className="p-1 flex items-center">
        <input
          type="text"
          value={query ?? ""}
          onFocusCapture={() => setInFocus(true)}
          ref={inputRef}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="border-none flex-1 p-1 leading-tight focus:outline-none md:w-[300px]"
        />
        {isInFocus && (
          <button
            type="button"
            className=" text-neutral-950 aspect-square bg-neutral-300 rounded-full h-fit w-fit"
            onClick={handleClear}
          >
            <IoIosClose />
          </button>
        )}
      </Container>
      {filteredResult.length != 0 && (
        <Container className="p-1 flex flex-col">
          <SearchSuggestionModal filteredResults={filteredResult} />
          <SearchHistoryModal />
          <button
            onClick={() => setSearchItem([])}
            className="text-xs text-[--text-color-secondary] justify-end"
          >
            Clear history
          </button>
        </Container>
      )}
    </div>
  );
};

export default SearchBar;
