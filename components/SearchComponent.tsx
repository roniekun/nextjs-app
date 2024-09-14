import SearchBar from "@/components/utils/search/search-bar";
import SearchHistoryModal from "@/components/utils/search/search-history";
import { useSearch } from "@/provider/context/SearchContext";

export default function SearchComponent() {
  const { isInFocus, setInFocus, setSearchItem } = useSearch();

  return (
    <div
      onBlur={() => setInFocus(false)}
      className="flex flex-col rounded-md relative border-gray-300 border
     bg-neutral-50 h-auto overflow-hidden md:w-[200px] w-full p-2"
    >
      <SearchBar />
    </div>
  );
}
