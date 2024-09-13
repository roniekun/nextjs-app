"use client";
import { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSearch, SearchItemProps } from "@/provider/context/SearchContext";
import { twMerge } from "tailwind-merge";

type SearchProps = {
  className?: string;
};

const SearchBar: React.FC<SearchProps> = ({ className }) => {
  const [query, setQuery] = useState<string | null>(null);
  const router = useRouter();
  const { searchItems, setSearchItem } = useSearch();
  const historyRef = useRef<HTMLParagraphElement[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      setQuery(e.target.value.trim());
    }
  };

  const handleSearch = () => {
    // const trimQuery = query.trim();
    if (query) {
      const newItem: SearchItemProps = {
        history: query,
        status: "Default",
      };
      setSearchItem((prevItems) => [...prevItems, newItem]);

      router.push(`/search?query=${encodeURIComponent(query)}`);
    }

    setQuery(null);
  };

  const [isFocus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const setRef = (el: HTMLParagraphElement | null, idx: number) => {
    if (el) {
      historyRef.current[idx] = el;
    }
  };

  const handleClick = (idx: number) => {
    setQuery(historyRef.current[idx].textContent);
    router.push(
      `/search?query=${encodeURIComponent(
        historyRef.current[idx].textContent ?? ""
      )}`
    );
  };

  // const handleClick = (idx: number) => {
  //   if (historyRef.current[idx] && inputRef.current) {
  //     inputRef.current.textContent = historyRef.current[idx].textContent ?? "";
  //   }
  // };

  const handleDelete = (i: number) => {
    const updatedItems = searchItems.filter((_, idx) => idx !== i);
    setSearchItem(updatedItems);
  };

  return (
    <div className="flex relative flex-col">
      <div
        className={twMerge(
          `flex relative items-center px-2 rounded-full m-1 right-0 border-gray-300  bg-neutral-50 
        md:max-w-[50vw] flex-1 py-2 mx-5`,
          className
        )}
      >
        <input
          type="text"
          value={query ?? ""}
          ref={inputRef}
          onChange={(e) => handleInputChange(e)}
          onFocus={handleFocus}
          // onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="appearance-none bg-transparent border-none flex-1 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className=" text-neutral-950 aspect-square bg-neutral-300 rounded-full h-auto"
          type="button"
        >
          <CiSearch className=" w-6 h-6 mx-1" />
        </button>
      </div>
      {isFocus && (
        <div className="absolute top-[100%] w-full z-20 ">
          {searchItems.map((item, idx) => (
            <div
              key={idx}
              className="flex bg-neutral-200 px-[2vw] justify-between p-0 gap-x-1 "
            >
              <p
                ref={(el) => setRef(el, idx)}
                onClick={() => handleClick(idx)}
                className="flex-1 cursor-pointer"
              >
                {item.history}
              </p>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => handleDelete(idx)}
              >
                remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
