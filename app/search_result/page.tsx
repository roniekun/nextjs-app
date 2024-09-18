"use client";
import { contentData, IContentData } from "@/data/content-data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "search",
};

function SearchResultPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const filteredData = contentData.filter((data) => {
    const title = data.title.trim().toLowerCase();
    return title === searchParams.query;
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
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
