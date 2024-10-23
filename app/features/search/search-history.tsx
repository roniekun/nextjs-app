"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks/hooks";
import {
  toggleOpenSearch,
  setQuery,
  setSearchItems,
} from "@/app/redux/slices/searchSlice";
import { SearchHistoryProps } from "@/app/redux/types/filterSearchItems";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

type Props = {
  filteredSearchItems: SearchHistoryProps[];
  setFilteredSearchItems: React.Dispatch<
    React.SetStateAction<SearchHistoryProps[]>
  >;
  selectedIndex: number | null;
};
const SearchHistoryModal: React.FC<Props> = ({
  filteredSearchItems,
  setFilteredSearchItems,
  selectedIndex,
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
      ); // updating the original search array
      setDeletedItem(deletedItem);
      dispatch(setSearchItems(updatedItems));
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
    <ul className="relative flex flex-col w-full rounded-b-md h-auto gap-y-1 overflow-x-scroll ">
      {filteredSearchItems.slice(0, 10).map((item, idx) => (
        <li
          key={idx}
          ref={(el) => setRef(el, idx)}
          className={`${
            selectedIndex === idx && "bg-neutral-900 bg-opacity-15"
          } flex list-none w-full relative justify-between gap-x-1`}
        >
          <div>
            <UpdateOutlinedIcon />
            <a
              onClick={() => handleClick(idx)}
              className="cursor-pointer flex text-left  relative gap-x-1"
            >
              {item.search}
            </a>
          </div>
          <IoIosClose
            className="cursor-pointer relative"
            onClick={() => handleDelete(item.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchHistoryModal;
