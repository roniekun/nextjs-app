import { IContentData } from "../../../data/content-data";
import { useRef } from "react";
import { SearchHistoryProps } from "@/store/types/filterSearchItems";
import { useRouter } from "next/navigation";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import {
  setQuery,
  toggleOpenSearch,
  addSearchItem,
  setInfocus,
} from "@/store/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

type Props = {
  filteredResults?: IContentData[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, searchItems } = useAppSelector((state) => state.search);
  const listRef = useRef<(HTMLLIElement | null)[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      listRef.current[idx] = el;
    }
  };

  const handleMouseDown = (idx: number) => {
    if (listRef.current) {
      const searchQuery = listRef.current[idx]?.textContent
        ?.toLowerCase()
        .trim();
      setQuery(searchQuery ?? "");
    }
  };

  const handleClick = (idx: number) => {
    if (listRef.current) {
      const newQuery = listRef.current[idx]?.textContent?.toLowerCase().trim();
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

  return (
    <ul className="flex flex-col relative gap-y-1">
      {filteredResults
        // [...new Set(filteredResults.map(result => result.title))] //optional for removing duplicates
        ?.sort((a, b) => a.title.localeCompare(b.title)) //sorting the result alphabetically
        .slice(0, 10)
        .map((result, idx) => (
          <li
            ref={(el) => setRef(el, idx)}
            onMouseDown={() => handleMouseDown(idx)}
            key={idx}
            onClick={() => handleClick(idx)}
            className="rounded-sm flex"
          >
            <SearchSharpIcon />
            <a className="cursor-pointer lowercase flex-1 " href={result.link}>
              {result.title}
            </a>
          </li>
        ))}
    </ul>
  );
};
