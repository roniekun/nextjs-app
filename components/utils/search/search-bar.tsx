"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import Container from "../container";
import { useRouter } from "next/navigation";
import {
  useSearch,
  SearchHistoryProps,
} from "@/provider/context/SearchContext";
import { twMerge } from "tailwind-merge";
import { SearchSuggestionModal } from "./search-suggestion";
import SearchHistoryModal from "./search-history";
import { contentData, IContentData } from "../data/content-data";
import debounce from "lodash/debounce";
import filterSearchItems from "./utils/filterSearchItems";

export type SearchProps = {
  placeholder?: string;
  className?: string;
  data?: IContentData[];
};

const SearchBar: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();
  const {
    isInFocus,
    setInFocus,
    setSearchItems,
    searchItems,
    setQuery,
    query,
  } = useSearch();

  const [filteredResult, setFilteredResult] = useState<IContentData[]>([]);
  const [filteredSearchItems, setFilteredSearchItems] = useState<
    SearchHistoryProps[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const debounceHandleInputChange = useCallback(
    debounce((enteredQuery: string) => {
      if (enteredQuery === "") {
        setFilteredResult([]);
        setInFocus(false);
      } else {
        const filteredData = contentData.filter((data) =>
          data.title.toLowerCase().trim().includes(enteredQuery)
        );
        const newFilteredSearchItem = searchItems.filter((item) =>
          item.search.toLowerCase().trim().includes(enteredQuery)
        );
        setFilteredSearchItems(newFilteredSearchItem);
        setFilteredResult(filteredData);
        setInFocus(true);
      }
    }, 300),
    [contentData, searchItems]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredQuery = e.target.value.trim().toLowerCase();
      setQuery(e.target.value);
      //
      debounceHandleInputChange(enteredQuery);
    }
  };

  const handleSearch = () => {
    if (query) {
      const trimQuery = query.trim();
      const newSearch: SearchHistoryProps = {
        search: trimQuery,
        id: searchItems.length + 1,
        date: Date.now(),
      };

      setSearchItems((prevSearch) =>
        filterSearchItems({ newSearch, prevSearch })
      );

      setInFocus(false);
      router.replace(`/search?query=${encodeURIComponent(trimQuery)}`);
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
    router.replace("/search");
  };

  return (
    <div
      className={twMerge(
        `flex relative overflow-visible flex-col h-auto w-[300px]`,
        className
      )}
    >
      <div>
        <Container className="flex relative w-full p-0 items-center">
          <input
            value={query ?? ""}
            ref={inputRef}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full shadow-md elative flex-1 border-[--border-color-secondary] border px-2 m-0 appearance-none bg-transparent  p-1 rounded-sm leading-tight focus:outline-none"
          />
          <div className="flex justify-center h-full items-center text-[--text-color-secondary] rounded-r-full">
            {isInFocus ? (
              <button
                type="button"
                className="aspect-square p-2"
                onClick={handleClear}
              >
                <IoIosClose />
              </button>
            ) : (
              <button type="button" className="aspect-square p-1">
                <MdOutlineSearch />
              </button>
            )}
          </div>
        </Container>
      </div>

      {(isInFocus || query) &&
        (filteredSearchItems.length > 0 || filteredResult.length > 0) && (
          <div className="absolute top-full z-10">
            <Container className="flex flex-col relative rounded-sm border-gray-300 border bg-[--background] h-auto overflow-hidden p-2">
              {filteredSearchItems.length > 0 && (
                <div className="flex flex-col">
                  <SearchHistoryModal
                    filteredSearchItems={filteredSearchItems}
                  />
                  <button
                    onClick={() => {
                      setSearchItems([]);
                      setQuery(null);
                      setInFocus(false);
                    }}
                    className="text-xs text-[--text-color-secondary] m-1 self-end justify-end"
                  >
                    Clear history
                  </button>
                </div>
              )}
              <SearchSuggestionModal filteredResults={filteredResult} />
            </Container>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
