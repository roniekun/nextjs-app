"use client";
import { useEffect, useRef } from "react";
import { MdHistory } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useSearch } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";

export default function SearchHistoryModal() {
  const router = useRouter();
  const { searchItems, setSearchItem, setQuery } = useSearch();
  const historyRef = useRef<HTMLParagraphElement[]>([]);

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

  //deleting items in history
  const handleDelete = (i: number) => {
    const updatedItems = searchItems.filter((_, idx) => idx !== i);
    setSearchItem(updatedItems);
  };

  useEffect(() => {
    console.log(searchItems);
    console.log("cli");
  }, [searchItems]);

  return (
    <div className="relative w-full rounded-b-md h-auto text-[--text-color-secondary]">
      {searchItems.map(
        (item, idx) =>
          idx < 5 && (
            <div
              key={idx}
              className="flex bg-[--background] px-[2vw] relative p-1 justify-between gap-x-1 "
            >
              <div
                ref={(el) => setRef(el, idx)}
                onClick={() => handleClick(idx)}
                className="flex-1 cursor-pointer flex item-center justify-center relative gap-x-1"
              >
                <MdHistory />
                <p className="text-[--text-color-secondary] ">{item.history}</p>
              </div>
              <button
                className="cursor-pointer relative"
                type="button"
                onClick={() => handleDelete(idx)}
              >
                <IoIosClose />
              </button>
            </div>
          )
      )}
    </div>
  );
}
