import SearchBar from "@/components/utils/search/search-bar";
import SearchHistoryModal from "@/components/utils/search/search-history";

export default function SearchComponent() {
  return (
    <div
      className="flex flex-col rounded-md m-1 relative border-[--border-color-secondary] border
     bg-neutral-50 "
    >
      <SearchBar />
      <SearchHistoryModal />
    </div>
  );
}
