import { IContentData } from "../../../data/content-data";
import { useRef } from "react";
import {
  SearchHistoryProps,
  useSearch,
} from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import filterSearchItems from "./util/filterSearchItems";

type Props = {
  filteredResults?: IContentData[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  const router = useRouter();
  const { setOpenSearch, setQuery, setSearchItems, setInFocus, searchItems } =
    useSearch();
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

      setSearchItems(
        (prevSearch) => filterSearchItems({ newSearch, prevSearch }) //calling reusasble utility function passing both object arguments
      );

      router.replace(
        `/search_result?query=${encodeURIComponent(newQuery ?? "")}`
      );
      setOpenSearch((prevState) => !prevState);
      setInFocus(false);
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
