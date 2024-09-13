"use client";
import { useSearch } from "@/provider/context/SearchContext";
import { contentData, IContentData } from "./data/content-data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SearchResult = () => {
  const [results, setResults] = useState<IContentData[]>([]);
  const { searchItem } = useSearch();

  function Title() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1 className="text-xl">
            <strong>Search result for:</strong> &ldquo;{query}&rdquo;
          </h1>
        </div>
      </Suspense>
    );
  }

  const highlightText = (text: string, searchItem: string | null) => {
    if (!searchItem) return text;
    const parts = text.split(new RegExp(`(${searchItem})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchItem.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (!searchItem) {
      setResults([]);
      return;
    }
    const filteredResults = contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchItem) ||
        item.content.toLowerCase().includes(searchItem)
    );

    setResults(filteredResults);
  }, [searchItem]);

  return (
    <>
      {results.length > 0 ? (
        <ul>
          <Title />
          {results.map((item) => (
            <li key={item.id} className="w-full relative p-[1vw]">
              <h1 className="font-medium">
                {highlightText(item.title, searchItem)}
              </h1>
              <p className="text-[--text-color-secondary]">
                {highlightText(item.content, searchItem)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col">
          <Title />
          <p>No results found</p>
        </div>
      )}
    </>
  );
};

export default SearchResult;
