import { IContentData } from "../data/content-data";
import { useRef } from "react";
import { useSearch } from "@/provider/context/SearchContext";

type Props = {
  filteredResults?: IContentData[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  const { setQuery } = useSearch();
  const listRef = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      listRef.current[idx] = el;
    }
  };

  const handleMouseHover = (idx: number) => {
    if (listRef.current) {
      const searchQuery = listRef.current[idx].textContent;
      setQuery(searchQuery ?? "");
    }
  };

  const handleMouseLeave = () => {
    setQuery("");
  };

  return (
    <ul className="flex flex-col">
      {filteredResults?.map((result, idx) => (
        <li
          ref={(el) => setRef(el, idx)}
          onMouseEnter={() => handleMouseHover(idx)}
          onMouseLeave={handleMouseLeave}
          key={idx}
          className="rounded-sm hover:bg-neutral-200"
        >
          <a className="cursor-pointer" href={result.link}>
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
