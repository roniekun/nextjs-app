import SearchResult from "@/components/utils/search/search-result";
import Container from "@/components/utils/container";
import SearchBar from "@/components/utils/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { Suspense } from "react";

export default function Search() {
  return (
    <PageTransitionLayout>
      <div className="relative w-full">
        <Container className="min-h-[400px] lg:px-[10vw]  relative items-center flex flex-col w-full">
          <SearchBar />
          <Suspense>
            <SearchResult className="w-full flex-1 relative flex justify-start" />
          </Suspense>
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
