import SearchBar from "../features/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "../libs/ui/container";
const Search: React.FC = () => {
  return (
    <PageTransitionLayout>
      <Container className="relative w-full lg:h-auto h-[--hero-height] justify-center items-center">
        <SearchBar />
      </Container>
    </PageTransitionLayout>
  );
};

export default Search;
