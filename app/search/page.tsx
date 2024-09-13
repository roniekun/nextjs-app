import SearchResult from "@/components/utils/search-result";
import Container from "@/components/utils/container";

export default function Search() {
  return (
    <Container className="min-h-screen flex place-content-center flex-col w-full">
      <SearchResult />
    </Container>
  );
}
