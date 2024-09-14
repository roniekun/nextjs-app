"use client";
import { useRef } from "react";
import { MdHistory } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useSearch } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";

export default function SearchHistoryModal() {
  const router = useRouter();
  const { searchItems, setSearchItem, setQuery } = useSearch();
  const historyRef = useRef<HTMLParagraphElement[]>([]);

  // const handleClick = (idx: number) => {
  //   if (historyRef.current[idx] && inputRef.current) {
  //     inputRef.current.textContent = historyRef.current[idx].textContent ?? "";
  //   }
  // };

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

  const handleDelete = (i: number) => {
    const updatedItems = searchItems.filter((_, idx) => idx !== i);
    setSearchItem(updatedItems);
  };
  return (
    <div className="absolute top-[100%] w-full z-20 ">
      {searchItems.map(
        (item, idx) =>
          idx < 5 && (
            <div
              key={idx}
              className="flex bg-[--backgound] px-[2vw] justify-between p-0 gap-x-1 "
            >
              <p
                ref={(el) => setRef(el, idx)}
                onClick={() => handleClick(idx)}
                className="flex-1 cursor-pointer"
              >
                <span>
                  <MdHistory />
                </span>
                {item.history}
              </p>
              <button
                className="cursor-pointer"
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
