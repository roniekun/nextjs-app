"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks/hooks";

import {
  addSearchItem,
  setInfocus,
  toggleOpenSearch,
  setQuery,
  setSearchItems,
} from "@/app/redux/slices/searchSlice";
import { SearchHistoryProps } from "@/app/redux/types/filterSearchItems";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { IContentData } from "@/data/content-data";

type Props = {
  setEnteredQuery: React.Dispatch<React.SetStateAction<string>>;
  searchSuggestions: (SearchHistoryProps | IContentData)[];
  setSearchSuggestions: React.Dispatch<
    React.SetStateAction<(SearchHistoryProps | IContentData)[]>
  >;
  selectedIndex: number | null;
};
const SearchSuggestionModal: React.FC<Props> = ({
  setEnteredQuery,
  searchSuggestions,
  setSearchSuggestions,
  selectedIndex,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchItems } = useAppSelector((state) => state.search);
  const [deletedItem, setDeletedItem] = useState<SearchHistoryProps | null>(
    null
  );

  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      suggestionRefs.current[idx] = el;
    }
  };

  const handleClickHistory = (idx: number) => {
    const textContent = suggestionRefs.current[idx]?.textContent ?? "";
    dispatch(setQuery(textContent));
    dispatch(toggleOpenSearch());

    router.replace(`/search_result?query=${encodeURIComponent(textContent)}`);
  };

  const handleMouseDown = (idx: number) => {
    if (suggestionRefs.current) {
      const searchQuery = suggestionRefs.current[idx]?.textContent
        ?.toLowerCase()
        .trim();
      setEnteredQuery(searchQuery ?? "");
    }
  };

  const handleClickSearch = (idx: number) => {
    if (suggestionRefs.current) {
      const newQuery = suggestionRefs.current[idx]?.textContent
        ?.toLowerCase()
        .trim();
      const newSearch: SearchHistoryProps = {
        search: newQuery ?? "",
        id: searchItems.length + 1,
        date: Date.now(),
      };
      dispatch(addSearchItem(newSearch));
      router.replace(
        `/search_result?query=${encodeURIComponent(newQuery ?? "")}`
      );
      dispatch(toggleOpenSearch());
      dispatch(setInfocus(false));
    }
  };

  //deleting items in history
  const handleDelete = (i: number) => {
    // Find the item with "search" in its properties and a matching ID
    const foundItem = searchSuggestions.find(
      (item): item is SearchHistoryProps => {
        return "search" in item && item.id === i;
      }
    );

    if (foundItem) {
      const updatedItems = searchSuggestions.filter(
        (item): item is SearchHistoryProps => {
          return "search" in item && item.date !== foundItem.date;
        }
      ); // Updating the original array by removing the deleted item
      setDeletedItem(foundItem); // Store the deleted item
      dispatch(setSearchItems(updatedItems)); // Update the state with filtered items
    }
  };

  useEffect(() => {
    if (deletedItem) {
      const updatedSearchSuggestions = searchSuggestions.filter(
        (item): item is SearchHistoryProps => {
          return "date" in item && item.date !== deletedItem.date;
        }
      );

      setSearchSuggestions(updatedSearchSuggestions);
    }
  }, [deletedItem]); //filteredSearchItems, setFilteredSearchItems

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleMouseHover = (idx: number) => {
    setHoveredItem(idx);
  };

  return (
    <ul className="relative flex flex-col w-full rounded-b-md h-auto gap-y-1 overflow-y-scroll ">
      {searchSuggestions.map((item, idx) => (
        <li
          key={idx}
          ref={(el) => setRef(el, idx)}
          onMouseEnter={() => handleMouseHover(idx)}
          className={`${
            (selectedIndex === idx || hoveredItem === idx) &&
            "bg-neutral-900 bg-opacity-10"
          } flex list-none w-full relative justify-between gap-x-1 rounded-md`}
        >
          {/* Conditional rendering based on 'search' or 'title' properties */}
          {"search" in item ? (
            <>
              <UpdateOutlinedIcon />
              <a
                onClick={() => handleClickHistory(idx)}
                className="cursor-pointer flex text-left flex-1 relative gap-x-1"
              >
                {item.search}
              </a>

              <IoIosClose
                className="cursor-pointer relative"
                onClick={() => handleDelete(item.id)}
              />
            </>
          ) : "title" in item ? (
            <div className="flex items-center gap-x-1">
              <SearchSharpIcon />
              <a
                onClick={() => handleClickSearch(idx)}
                onMouseDown={() => {
                  handleMouseDown(idx);
                }}
                className="cursor-pointer flex text-left flex-1 relative gap-x-1"
              >
                {item.title}
              </a>
              <span className="read-only" />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestionModal;
