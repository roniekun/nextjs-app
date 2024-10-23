import { contentData } from "@/data/content-data";
import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/lib/ui/container";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

function SearchResultPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  //filtering data to display as result
  const filteredData = contentData.filter((data) => {
    const query = searchParams.query.trim().toLowerCase();
    const title = data.title.trim().toLowerCase();
    const content = data.content.trim().toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  console.log(filteredData);

  return (
    <div className="flex flex-col min-h-screen w-full items-center relative justify-center">
      <Suspense fallback={<h2>Loading results...</h2>}>
        {filteredData.length > 0 ? (
          <Container>
            {filteredData.map((data, idx) => (
              <div key={idx}>
                <Link href={`/search_result/${data.id}`}>
                  <h1>{data.title}</h1>
                </Link>
                <p>{data.content}</p>
              </div>
            ))}
          </Container>
        ) : (
          <Container>
            <h1>No Result Found.</h1>
          </Container>
        )}
      </Suspense>
    </div>
  );
}

export default SearchResultPage;
