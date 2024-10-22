"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { SearchSuggestionModal } from "./search-suggestion";
import SearchHistoryModal from "./search-history";
import { IContentData } from "../../../data/content-data";
import debounce from "lodash/debounce";
import { useAppSelector } from "@/store/hooks/hooks";
import { useAppDispatch } from "@/store/hooks/hooks";
import {
  setOpenSearch,
  setInfocus,
  setQuery,
  addSearchItem,
  toggleOpenSearch,
  setSearchItems,
} from "@/store/slices/searchSlice";
import { SearchHistoryProps } from "@/store/slices/searchSlice";

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

  const [filteredResult, setFilteredResult] = useState<IContentData[]>([]);
  const [filteredSearchItems, setFilteredSearchItems] = useState<
    SearchHistoryProps[]
  >([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // filtering the result every 300 miliseconds as value of the query changes using
  // useCallback and debounce/lodash
  const debounceHandleInputChange = useCallback(
    debounce((enteredQuery: string) => {
      const formattedQuery = enteredQuery.trim().toLowerCase();

      const filteredData = contentData?.filter((data) =>
        data.title.toLowerCase().trim().includes(formattedQuery)
      );
      const newFilteredSearchItem = searchItems.filter((item) =>
        item.search.toLowerCase().trim().includes(formattedQuery)
      );
      setFilteredSearchItems(newFilteredSearchItem);

      setFilteredResult(filteredData);
      dispatch(setInfocus(true));
    }, 300),
    [contentData, searchItems, isInfocus]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      const enteredQuery = e.target.value;
      dispatch(setQuery(enteredQuery));

      //calling the debounced search result
      debounceHandleInputChange(enteredQuery);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement> | null) => {
    dispatch(setInfocus(true));
  };

  const handleSearch = () => {
    if (query) {
      const trimQuery = query.trim();
      const newSearch: SearchHistoryProps = {
        search: trimQuery,
        id: searchItems.length + 1,
        date: Date.now(),
      };

      dispatch(addSearchItem(newSearch));
      dispatch(setInfocus(false));
      dispatch(setOpenSearch(false));
      router.replace(`/search_result?query=${encodeURIComponent(trimQuery)}`);
    }
  };

  useEffect(() => {
    console.log(isInfocus);
  }, [isInfocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    dispatch(setQuery(""));
    dispatch(setInfocus(false));
  };

  return (
    <div className={twMerge(`flex relative flex-col h-auto w-full`, className)}>
      <div className="flex relative w-full p-0 items-center my-2">
        <input
          value={query ?? ""}
          ref={inputRef}
          onClick={(e) => {
            handleClick(e);
          }}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full text-lg relative flex-1 border-[--border-color-secondary] border-b px-2 m-0 
          appearance-none bg-transparent  p-1 leading-tight focus:outline-none"
        />
        <div className="flex justify-center h-full items-center rounded-r-full cursor-pointer">
          {isInfocus ? (
            <IoIosClose onClick={handleClear} />
          ) : (
            <MdOutlineSearch onClick={handleSearch} />
          )}
        </div>
      </div>

      {(isInfocus || query) &&
        (filteredSearchItems.length > 0 || filteredResult.length > 0) && (
          <div className="relative h-auto">
            <div className="flex flex-col relative rounded-sm h-auto overflow-hidden p-2 text-lg">
              <SearchHistoryModal
                filteredSearchItems={filteredSearchItems}
                setFilteredSearchItems={setFilteredSearchItems}
              />
              <SearchSuggestionModal filteredResults={filteredResult} />
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
