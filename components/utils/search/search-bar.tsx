"use client";
import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSearch, SearchItemProps } from "@/provider/context/SearchContext";
import { twMerge } from "tailwind-merge";

type SearchProps = {
  className?: string;
};

const SearchBar: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();
  const { setSearchItem, setQuery, query } = useSearch();
  const [isInFocus, setInFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      setQuery(e.target.value);
    }
  };

  const handleSearch = () => {
    if (query) {
      const trimQuery = query.trim();
      const newItem: SearchItemProps = {
        history: trimQuery,
        status: "Default",
      };
      setSearchItem((prevItems) => [...prevItems, newItem]);

      router.push(`/search?query=${encodeURIComponent(trimQuery)}`);
    }

    setQuery(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleFocus = () => {
    setInFocus(true);
  };
  const handleClear = () => {
    setQuery(null);
  };

  return (
    <div className={twMerge(`flex relative px-2 md:max-w-[50vw]`, className)}>
      <input
        type="text"
        value={query ?? ""}
        ref={inputRef}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyDown}
        onFocusCapture={handleFocus}
        placeholder="Search..."
        className="appearance-none bg-transparent border-none flex-1 text-gray-700 mr-3 py-1 px-2 leading-tight
        focus:outline-none"
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
    </div>
  );
};

export default SearchBar;