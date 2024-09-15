"use client";
import { useRef, useState, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
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
import debounce from "lodash/debounce";

type SearchProps = {
  placeholder?: string;
  className?: string;
  data?: IContentData[];
};

const SearchBar: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();
  const { isInFocus, setInFocus, setSearchItem, searchItems, setQuery, query } =
    useSearch();

  const [filteredResult, setFilteredResult] = useState<filteredResultProps[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // const debounceHandleInputChange = useCallback(
  //   debounce((enteredQuery: string) => {

  //   }, 300),
  //   [contentData]
  // );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredQuery = e.target.value.trim().toLowerCase();
      setQuery(e.target.value);
      //
      if (enteredQuery === "") {
        setFilteredResult([]);
        setInFocus(false);
      } else {
        const filteredData = contentData.filter((data) =>
          data.title.toLowerCase().trim().includes(enteredQuery)
        );

        setFilteredResult(filteredData);
        setInFocus(true);
      }
    }
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
    setInFocus(false);
  };

  return (
    <div
      className={twMerge(
        `flex relative flex-col rounded-md  border-gray-300 border
     bg-neutral-50 h-auto overflow-hidden p-2`,
        className
      )}
    >
      <Container className="p-1 flex items-center">
        <input
          type="text"
          value={query ?? ""}
          ref={inputRef}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="border-none appearance-none bg-transparent flex-1 p-1 mr-1 rounded-md leading-tight focus:outline-none 
          md:w-[300px]"
        />
        {isInFocus ? (
          <button
            type="button"
            className=" text-neutral-950 aspect-square p-1 bg-neutral-300 rounded-full h-fit w-fit"
            onClick={handleClear}
          >
            <IoIosClose />
          </button>
        ) : (
          <button
            type="button"
            className=" text-neutral-950 aspect-square p-1 bg-neutral-300 rounded-full h-fit w-fit"
          >
            <MdOutlineSearch />
          </button>
        )}
      </Container>

      {isInFocus && (
        <Container className="flex flex-col absolute top-[100%] rounded-md border-gray-300 border bg-neutral-50 h-auto overflow-hidden p-2">
          <SearchSuggestionModal filteredResults={filteredResult} />
          {searchItems.length > 0 && (
            <div className="flex flex-col">
              <SearchHistoryModal />
              <button
                onClick={() => setSearchItem([])}
                className="text-xs text-[--text-color-secondary] justify-end"
              >
                Clear history
              </button>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default SearchBar;
