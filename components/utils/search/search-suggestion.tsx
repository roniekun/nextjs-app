import { IContentData } from "../data/content-data";
import { useRef } from "react";
import { useSearch } from "@/provider/context/SearchContext";

type Props = {
  filteredResults?: IContentData[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  const { setQuery } = useSearch();
  const listRef = useRef<HTMLLIElement | null>(null);

  const handleHover = () => {
    if (listRef.current) {
      const searchQuery = listRef.current.textContent;
      setQuery(searchQuery ?? "");
    }
  };

  return (
    <ul className="flex flex-col">
      {filteredResults?.map((result, idx) => (
        <li
          ref={listRef}
          onMouseEnter={handleHover}
          key={idx}
          className=" hover:bg-neutral-300"
        >
          <a className="cursor-pointer" href={result.link}>
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
