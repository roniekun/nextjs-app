"use client";
import { contentData, IContentData } from "./data/content-data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSearch } from "@/provider/context/SearchContext";
import Container from "./container";

const SearchResult = () => {
  const [results, setResults] = useState<IContentData[]>([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("query");
  const { searchItems } = useSearch();

  function Title() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-5">
          <>
            {query && (
              <h1 className="text-2xl">
                <strong>Search result for:</strong> &ldquo;{query}&rdquo;
              </h1>
            )}
          </>
        </div>
      </Suspense>
    );
  }

  const highlightText = (text: string, query: string | null) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (!query) return setResults([]);
    const filteredResults = contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
    setLoading(false);
  }, [query]);

  return (
    <>
      <Container>
        {results.length > 0 ? (
          <ul className="w-full relative flex flex-col gap-y-5">
            <Title />
            {results.map((item) => (
              <li key={item.id} className="w-full relative ">
                <h1 className="font-medium">
                  {highlightText(item.title, query)}
                </h1>
                <p className="text-[--text-color-secondary]">
                  {highlightText(item.content, query)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col w-full relative">
            <Title />
            {loading ? <p>Loading...</p> : <p>No results found</p>}
          </div>
        )}
      </Container>
    </>
  );
};

export default SearchResult;
