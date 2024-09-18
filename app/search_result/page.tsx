import { contentData } from "@/data/content-data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
};

function SearchResultPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const filteredData = contentData.filter((data) => {
    const title = data.title.trim().toLowerCase();
    return title.includes(searchParams.query);
  });

  console.log(filteredData);

  return (
    <div className="flex flex-col min-h-screen w-full items-center relative justify-center">
      {filteredData.map((data, idx) => (
        <div key={idx}>
          <Link href={`/search_result/${data.id}`}>
            <h1>{data.title}</h1>
          </Link>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResultPage;
