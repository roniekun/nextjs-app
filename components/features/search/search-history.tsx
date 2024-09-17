"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSearch } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";
import { SearchHistoryProps } from "@/provider/context/SearchContext";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import filterSearchItems from "./utils/filterSearchItems";

type Props = {
  filteredSearchItems: SearchHistoryProps[];
  setFilteredSearchItems: React.Dispatch<
    React.SetStateAction<SearchHistoryProps[]>
  >;
};

const SearchHistoryModal: React.FC<Props> = ({
  filteredSearchItems,
  setFilteredSearchItems,
}) => {
  const router = useRouter();
  const { searchItems, setSearchItems, setQuery } = useSearch();
  const historyRef = useRef<HTMLLIElement[]>([]);
  const [deletedItem, setDeletedItem] = useState<SearchHistoryProps>();

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
    const deletedItem = filteredSearchItems.filter((item) => item.id === id); //storing the  search history user deleted
    const updatedItems = searchItems.filter((searchItems) =>
      deletedItem.some((item) => item.id !== searchItems.id)
    ); // updating the original search collection
    const targetItem = deletedItem[0];
    const updatedFilteredSearchItems = filteredSearchItems.filter(
      (item) => item.id !== targetItem.id
    );
    setFilteredSearchItems(updatedFilteredSearchItems);
    setSearchItems(updatedItems);
    setDeletedItem(deletedItem[0]);
  };

  // useEffect(() => {
  //   console.log(deletedItem);
  //   if (deletedItem) {
  //     const updatedFilteredSearchItems = filteredSearchItems.filter(
  //       (item) => item.id !== deletedItem.id
  //     );

  //     setFilteredSearchItems(updatedFilteredSearchItems);
  //   }
  // }, [deletedItem]);

  return (
    <ul className="relative flex flex-col w-full rounded-b-md h-auto text-[--text-color-secondary]">
      {filteredSearchItems.map((item, idx) => (
        <li
          key={idx}
          ref={(el) => setRef(el, idx)}
          className="flex list-none w-full relative rounded-sm hover:bg-neutral-200 hover:bg-opacity-50 justify-between gap-x-1 "
        >
          <UpdateOutlinedIcon />
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
