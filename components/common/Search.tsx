import SearchBar from "../features/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
const Search: React.FC = () => {
  return (
    <PageTransitionLayout>
      <div className="mx-5 relative w-full lg:h-auto h-[--hero-height] justify-center items-center">
        <SearchBar />
      </div>
    </PageTransitionLayout>
  );
};

export default Search;
