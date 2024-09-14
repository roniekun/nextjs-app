import SearchBar from "@/components/utils/search/search-bar";
import SearchHistoryModal from "@/components/utils/search/search-history";
import { useSearch } from "@/provider/context/SearchContext";

export default function SearchComponent() {
  const { isInFocus } = useSearch();

  return (
    <div
      className="flex flex-col rounded-md m-1 relative border-gray-300 border
     bg-neutral-50 h-auto overflow-hidden"
    >
      <SearchBar />
      {isInFocus && <SearchHistoryModal />}
    </div>
  );
}
