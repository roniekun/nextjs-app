import SearchResult from "@/components/features/search/search-result";
import Container from "@/components/libs/ui/container";
import Search from "@/components/common/Search";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <PageTransitionLayout>
      <div className="relative w-full">
        <Container className="min-h-[400px] lg:px-[10vw]  relative items-center flex flex-col w-full">
          <Search />
          <Suspense>
            <SearchResult className="w-full flex-1 relative flex justify-start" />
          </Suspense>
        </Container>
      </div>
    </PageTransitionLayout>
  );
}
