"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import SearchSuggestionModal from "./search-suggestion";
import { IContentData } from "../../../data/content-data";
import debounce from "lodash/debounce";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks/hooks";
import { SearchHistoryProps } from "@/app/redux/types/filterSearchItems";
import {
  setOpenSearch,
  setInfocus,
  setQuery,
  addSearchItem,
} from "@/app/redux/slices/searchSlice";

export type SearchProps = {
  placeholder?: string;
  className?: string;
  contentData: IContentData[];
};

const SearchBar: React.FC<SearchProps> = ({
  className,
  placeholder,
  contentData,
}) => {
  const dispatch = useAppDispatch();
  const { isInfocus, searchItems, query } = useAppSelector(
    (state) => state.search
  );
  const router = useRouter();

  const [filteredSearchItems, setFilteredSearchItems] = useState<
    SearchHistoryProps[]
  >([]);

  const [filteredResult, setFilteredResult] = useState<IContentData[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<
    (IContentData | SearchHistoryProps)[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [enteredQuery, setEnteredQuery] = useState(query);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // filtering the result every 300 miliseconds as value of the query changes using
  // useCallback and debounce/lodash
  const debounceHandleInputChange = useCallback(
    debounce((enteredKey: string) => {
      if (enteredKey === "") {
        setFilteredSearchItems([...searchItems]);
        setFilteredResult([]);
      } else {
        dispatch(setQuery(enteredKey));
        const formattedQuery = enteredKey.trim().toLowerCase();

        const filteredData = contentData?.filter((data) =>
          data.title.toLowerCase().trim().includes(formattedQuery)
        );
        const newFilteredSearchItem = searchItems.filter((item) =>
          item.search.toLowerCase().trim().includes(formattedQuery)
        );
        setFilteredSearchItems(newFilteredSearchItem);

        setFilteredResult(filteredData);
      }
    }, 300),
    [contentData, searchItems, isInfocus]
  );

  //realtime changes of inputs value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredKey = e.target.value;
      setEnteredQuery(enteredKey);
      //calling the debounced search result
      debounceHandleInputChange(enteredKey);
    }
  };

  function updateSuggestions() {
    setSearchSuggestions(
      enteredQuery.length > 0 ? [...searchSuggestions] : [...searchItems]
    );
    console.log(enteredQuery);
    console.log(enteredQuery.length);
  }

  //click event for input field
  const handleClick = (e: React.MouseEvent<HTMLInputElement> | null) => {
    dispatch(setInfocus(true));
    setSelectedIndex(-1);
    updateSuggestions();
  };

  //execute search
  const handleSearch = () => {
    if (enteredQuery) {
      const trimQuery = enteredQuery.trim();
      const newSearch: SearchHistoryProps = {
        search: trimQuery,
        id: searchItems.length + 1,
        date: Date.now(),
      };
      dispatch(setQuery(trimQuery));
      dispatch(addSearchItem(newSearch));
      dispatch(setInfocus(false));
      dispatch(setOpenSearch(false));
      router.replace(`/search_result?query=${encodeURIComponent(trimQuery)}`);
    }
  };
  //for keyboard functions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = enteredQuery ? searchSuggestions : searchItems;

    // if (!items.length) return;

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          prevIndex < items.length - 1 ? prevIndex + 1 : items.length - 1
        );
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
        break;
      case "Enter":
        handleSearch();
        break;
    }
  };

  //selecting result to highlight (for user experience)
  useEffect(() => {
    const filteredSuggestion = searchSuggestions.find(
      (_, index) => index === selectedIndex
    );
    if (filteredSuggestion && "search" in filteredSuggestion) {
      filteredSuggestion;
      setEnteredQuery(filteredSuggestion.search);
    } else if (filteredSuggestion && "title" in filteredSuggestion) {
      setEnteredQuery(filteredSuggestion.title);
    } else return;
  }, [selectedIndex]);

  //clears the input field
  const handleClear = () => {
    dispatch(setInfocus(false));
    dispatch(setQuery(""));
    setEnteredQuery("");
  };

  //realtime updates for suggestions
  useEffect(() => {
    setSearchSuggestions([...filteredSearchItems, ...filteredResult]);
  }, [filteredSearchItems, filteredResult]); //merging suggestions

  return (
    <div className={twMerge(`flex relative flex-col h-auto w-full`, className)}>
      <div className="flex relative w-full p-0 items-center my-2">
        <input
          value={enteredQuery ?? ""}
          ref={inputRef}
          onClick={(e) => {
            handleClick(e);
          }}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full text-lg relative flex-1 border-[--border-color-primary] border-b px-2 m-0 
          appearance-none bg-transparent  p-1 leading-tight focus:ring-0 focus:outline-none"
        />
        <div className="flex justify-center h-full items-center rounded-r-full cursor-pointer">
          {isInfocus ? (
            <IoIosClose onClick={handleClear} />
          ) : (
            <MdOutlineSearch onClick={handleSearch} />
          )}
        </div>
      </div>

      {(isInfocus || query) && searchSuggestions.length > 0 && (
        <div className="relative h-auto">
          <div className="flex flex-col relative rounded-sm h-auto overflow-hidden p-2 text-lg">
            <SearchSuggestionModal
              setEnteredQuery={setEnteredQuery}
              selectedIndex={selectedIndex ?? null}
              setSearchSuggestions={setSearchSuggestions}
              searchSuggestions={searchSuggestions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
