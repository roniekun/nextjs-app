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
  const { setQuery, setSearchItems, searchItems } = useSearch();
  const listRef = useRef<HTMLLIElement[]>([]);

  const setRef = (el: HTMLLIElement | null, idx: number) => {
    if (el) {
      listRef.current[idx] = el;
    }
  };

  const handleMouseDown = (idx: number) => {
    if (listRef.current) {
      const searchQuery = listRef.current[idx].textContent
        ?.toLowerCase()
        .trim();
      setQuery(searchQuery ?? "");
    }
  };

  const handleClick = (idx: number) => {
    if (listRef.current) {
      const newQuery = listRef.current[idx].textContent
        ?.toLocaleLowerCase()
        .trim();
      const newSearch: SearchItemProps = {
        history: newQuery ?? "",
        id: searchItems.length + 1,
        date: Date.now(),
      };

      setSearchItems((prevSearch) => {
        const updatedSearchItems = [...prevSearch, newSearch];

        updatedSearchItems.sort((a, b) => b.date - a.date);

        return updatedSearchItems;
      });
      router.push(`/search?query=${encodeURIComponent(newQuery ?? "")}`);
    }
  };

  return (
    <ul className="flex flex-col">
      {filteredResults?.slice(0, 10).map((result, idx) => (
        <li
          ref={(el) => setRef(el, idx)}
          onMouseDown={() => handleMouseDown(idx)}
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
