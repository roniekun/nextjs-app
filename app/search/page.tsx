import SearchResult from "@/components/utils/search/search-result";
import Container from "@/components/utils/container";
import SearchBar from "@/components/utils/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { Suspense } from "react";

export default function Search() {
  return (
    <PageTransitionLayout>
      <Container className="min-h-[400px] lg:px-[10vw] items-center flex flex-col w-full">
        <SearchBar />
        <Suspense>
          <SearchResult />
        </Suspense>
      </Container>
    </PageTransitionLayout>
  );
}
