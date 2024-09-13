import SearchResult from "@/components/utils/search-result";
import Container from "@/components/utils/container";
import { Suspense } from "react";

export default function Search() {
  return (
    <Container className="min-h-screen flex place-content-center flex-col w-full">
      <Suspense>
        <SearchResult />
      </Suspense>
    </Container>
  );
}
