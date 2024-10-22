"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { setSearchItems } from "@/store/slices/searchSlice";

import { toggleOpenSearch, setQuery } from "@/store/slices/searchSlice";
import { SearchHistoryProps } from "@/store/slices/searchSlice";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

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
  const dispatch = useAppDispatch();
  const { searchItems } = useAppSelector((state) => state.search);
  const historyRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [deletedItem, setDeletedItem] = useState<SearchHistoryProps | null>(
    null
  );

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      historyRefs.current[idx] = el;
    }
  };

  const handleClick = (idx: number) => {
    const textContent = historyRefs.current[idx]?.textContent ?? "";
    dispatch(setQuery(textContent));
    dispatch(toggleOpenSearch());

    router.replace(`/search_result?query=${encodeURIComponent(textContent)}`);
  };

  //deleting items in history
  const handleDelete = (i: number) => {
    const deletedItem = filteredSearchItems.find((item) => item.id === i); //storing the  search history user deleted
    if (deletedItem) {
      const updatedItems = searchItems.filter(
        (item) => deletedItem.date !== item.date
      ); // updating the original search collection
      setSearchItems(updatedItems);
      setDeletedItem(deletedItem);
    }
  };

  useEffect(() => {
    if (deletedItem) {
      const updatedFilteredSearchItems = filteredSearchItems.filter(
        (item) => item.date !== deletedItem.date
      );

      setFilteredSearchItems(updatedFilteredSearchItems);
    }
  }, [deletedItem]); //filteredSearchItems, setFilteredSearchItems

  return (
    <ul className="relative flex flex-col w-full rounded-b-md h-auto gap-y-1 ">
      {filteredSearchItems.slice(0, 10).map((item, idx) => (
        <li
          key={idx}
          ref={(el) => setRef(el, idx)}
          className="flex list-none w-full relative justify-between gap-x-1"
        >
          <UpdateOutlinedIcon />
          <a
            onClick={() => handleClick(idx)}
            className="flex-1 cursor-pointer  flex item-center relative gap-x-1"
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
