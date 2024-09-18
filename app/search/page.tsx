"use client";
import { contentData, IContentData } from "@/data/content-data";
import { useEffect, useState, useMemo } from "react";
import { useSearch } from "@/provider/context/SearchContext";
import Container from "@/components/libs/ui/container";
import Search from "@/components/common/Search";
import GenerateTitle from "@/components/features/search/libs/GererateTitle";

type Props = {
  className?: string;
};

// Title component
const Title: React.FC<{ query: string | null }> = ({ query }) => (
  <div className="my-5">
    {query && (
      <h1 className="text-2xl">
        <strong>Search result for:</strong> &ldquo;{query}&rdquo;
      </h1>
    )}
  </div>
);

// Custom hook for filtering results
const useFilteredResults = (
  query: string | null
): [IContentData[], boolean] => {
  const [results, setResults] = useState<IContentData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const filteredResults = contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
    setLoading(false);
  }, [query]);

  return [results, isLoading];
};

//  for highlighting the query in text
const useTextWithHighlights = (
  results: IContentData[],
  query: string | null
): JSX.Element => {
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

  return useMemo(() => {
    if (results.length === 0) {
      return (
        <ul>
          <h3>No Results found.</h3>
        </ul>
      );
    }

    return (
      <ul>
        {results.map((item) => (
          <li key={item.id} className="w-full relative">
            <h1 className="font-medium">{highlightText(item.title, query)}</h1>
            <p className="text-[--text-color-secondary]">
              {highlightText(item.content, query)}
            </p>
          </li>
        ))}
      </ul>
    );
  }, [results, query]);
};

function SearchPage() {
  const { query } = useSearch();
  const [results, isLoading] = useFilteredResults(query);
  const textWithHighlights = useTextWithHighlights(results, query);

  return (
    <div className="flex flex-col">
      <GenerateTitle query={results ? `${query}` : "Search Not Found"} />
      <>
        <Search />
      </>
      {query && (
        <Container>
          <Title query={query} />
          {isLoading ? <p>Loading...</p> : textWithHighlights}
        </Container>
      )}
    </div>
  );
}

export default SearchPage;
