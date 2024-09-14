"use client";
import { useEffect, useRef } from "react";
import { MdHistory } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useSearch } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";

export default function SearchHistoryModal() {
  const router = useRouter();
  const { searchItems, setSearchItem, setQuery } = useSearch();
  const historyRef = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
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

  //deleting items in history
  const handleDelete = (i: number) => {
    const updatedItems = searchItems.filter((_, idx) => idx !== i);
    setSearchItem(updatedItems);
  };

  const handleClear = () => {
    setSearchItem([]);
  };

  return (
    <div className="relative flex flex-col w-full rounded-b-md h-auto text-[--text-color-secondary]">
      {searchItems.map(
        (item, idx) =>
          idx < 5 && (
            <ul
              key={idx}
              className="flex list-none bg-[--background] w-full m-1 relative  justify-between gap-x-1 "
            >
              <li
                ref={(el) => setRef(el, idx)}
                onClick={() => handleClick(idx)}
                className="flex-1 cursor-pointer flex item-center relative gap-x-1"
              >
                <MdHistory />
                <p className="text-[--text-color-secondary] ">{item.history}</p>
              </li>
              <button
                className="cursor-pointer relative"
                type="button"
                onClick={() => handleDelete(idx)}
              >
                <IoIosClose />
              </button>
            </ul>
          )
      )}
      <button
        onClick={handleClear}
        className="text-xs text-[--text-color-secondary] self-end"
      >
        {" "}
        clear all
      </button>
    </div>
  );
}
