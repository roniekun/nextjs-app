import { IContentData } from "../data/content-data";
import { useRef } from "react";
import { useSearch } from "@/provider/context/SearchContext";
import { SearchItemProps } from "@/provider/context/SearchContext";
import { useRouter } from "next/navigation";

type Props = {
  filteredResults?: IContentData[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  const router = useRouter();
  const { setQuery, setSearchItems } = useSearch();
  const listRef = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      listRef.current[idx] = el;
    }
  };

  const handleMouseHover = (idx: number) => {
    if (listRef.current) {
      const searchQuery = listRef.current[idx].textContent
        ?.toLowerCase()
        .trim();
      setQuery(searchQuery ?? "");
    }
  };

  const handleMouseLeave = () => {
    setQuery("");
  };

  const handleClick = (idx: number) => {
    if (listRef.current) {
      const newSearch: SearchItemProps = {
        history: listRef.current[idx].textContent ?? "",
        status: "default",
      };

      setSearchItems((prevSearch) => [...prevSearch, newSearch]);
      router.push(
        `/search?query=${encodeURIComponent(
          listRef.current[idx].textContent ?? ""
        )}`
      );
    }
  };

  return (
    <ul className="flex flex-col">
      {filteredResults?.map((result, idx) => (
        <li
          ref={(el) => setRef(el, idx)}
          onMouseEnter={() => handleMouseHover(idx)}
          onMouseLeave={handleMouseLeave}
          key={idx}
          onClick={() => handleClick(idx)}
          className="rounded-sm hover:bg-neutral-200"
        >
          <a className="cursor-pointer lowercase" href={result.link}>
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
