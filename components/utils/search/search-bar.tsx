"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import Container from "../container";
import { useRouter } from "next/navigation";
import { useSearch, SearchItemProps } from "@/provider/context/SearchContext";
import { twMerge } from "tailwind-merge";
import { SearchSuggestionModal } from "./search-suggestion";
import SearchHistoryModal from "./search-history";
import { contentData, IContentData } from "../data/content-data";
import debounce from "lodash/debounce";

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

        setFilteredResult(filteredData);
        setInFocus(true);
      }
    }, 1000),
    [contentData]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredQuery = e.target.value.trim().toLowerCase();
      setQuery(e.target.value);
      //
      debounceHandleInputChange(enteredQuery);
    }
  };

  useEffect(() => {
    console.log(filteredResult);
  }, [filteredResult]);

  const handleSearch = () => {
    if (query) {
      const trimQuery = query.trim();
      const newSearch: SearchItemProps = {
        history: trimQuery,
        status: "default",
      };
      setSearchItems((prevSearch) => [...prevSearch, newSearch]);
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
        `flex relative flex-col h-auto overflow-hidden `,
        className
      )}
    >
      <div>
        <Container className="flex relative w-full p-0 items-center">
          <input
            type="text"
            value={query ?? ""}
            ref={inputRef}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="min-w-[200px] w-[400px] relative flex-1 border-gray-300 border bg-neutral-50 px-2 m-0 appearance-none bg-transparent  p-1 rounded-sm leading-tight focus:outline-none"
          />
          {isInFocus ? (
            <button
              type="button"
              className="text-[--text-color-secondary] aspect-square p-1 bg-neutral-300 rounded-full h-fit w-fit mx-1"
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
      </div>

      {(isInFocus || !query) &&
        (searchItems.length > 0 || filteredResult.length > 0) && (
          <div>
            <Container className="flex flex-col relative rounded-sm border-gray-300 border bg-neutral-50 h-auto overflow-hidden p-2">
              <SearchSuggestionModal filteredResults={filteredResult} />
              {searchItems.length > 0 && (
                <div className="flex flex-col">
                  <SearchHistoryModal />
                  <button
                    onClick={() => {
                      setSearchItems([]);
                      setQuery(null);
                    }}
                    className="text-xs text-[--text-color-secondary] m-1 justify-end"
                  >
                    Clear history
                  </button>
                </div>
              )}
            </Container>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
