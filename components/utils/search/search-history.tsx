"use client";
import { useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useSearch } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";
import { SearchHistoryProps } from "@/provider/context/SearchContext";

type Props = {
  filteredSearchItems: SearchHistoryProps[];
};

const SearchHistoryModal: React.FC<Props> = ({ filteredSearchItems }) => {
  const router = useRouter();
  const { searchItems, setSearchItems, setQuery } = useSearch();
  const historyRef = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      historyRef.current[idx] = el;
    }
  };

  const handleClick = (idx: number) => {
    setQuery(historyRef.current[idx].textContent);
    router.replace(
      `/search?query=${encodeURIComponent(
        historyRef.current[idx].textContent ?? ""
      )}`
    );
  };

  //deleting items in history
  const handleDelete = (id: number) => {
    const updatedItems = searchItems.filter((item) => item.id !== id);
    setSearchItems(updatedItems);
  };

  return (
    <ul className="relative flex flex-col w-full rounded-b-md h-auto text-[--text-color-secondary]">
      {filteredSearchItems.map((item, idx) => (
        <li
          key={idx}
          ref={(el) => setRef(el, idx)}
          className="flex list-none w-full relative rounded-sm hover:bg-neutral-200 justify-between gap-x-1 "
        >
          <a
            onClick={() => handleClick(idx)}
            className="flex-1 cursor-pointer flex item-center relative gap-x-1 text-[--text-color-secondary] "
          >
            {item.search}
          </a>
          <button
            className="cursor-pointer relative"
            type="button"
            onClick={() => handleDelete(item.id)}
          >
            <IoIosClose />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistoryModal;
