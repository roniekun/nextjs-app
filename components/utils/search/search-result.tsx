"use client";
import { contentData, IContentData } from "../data/content-data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "../container";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const SearchResult: React.FC<Props> = ({ className }) => {
  const [results, setResults] = useState<IContentData[]>([]);
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const query = searchParams.get("query");
  const [text, setText] = useState<JSX.Element>();

  function Title() {
    return (
      <div className="my-5">
        <>
          {query && (
            <h1 className="text-2xl">
              <strong>Search result for:</strong> &ldquo;{query}&rdquo;
            </h1>
          )}
        </>
      </div>
    );
  }

  //performing highlight in the matched query in filtered results
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

  // setting the text as jsx element to render in the UI
  useEffect(() => {
    if (results) {
      const text = results.map((item) => (
        <li key={item.id} className="w-full relative ">
          <h1 className="font-medium">{highlightText(item.title, query)}</h1>
          <p className="text-[--text-color-secondary]">
            {highlightText(item.content, query)}
          </p>
        </li>
      ));
      setText(
        <ul>
          <Title />
          {text}
        </ul>
      );
    } else
      setText(
        <ul>
          <Title />
          <h3>No Results found.</h3>
        </ul>
      );
  }, [results]);

  //filtering the results of query
  useEffect(() => {
    if (!query) return setResults([]);
    const filteredResults = contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );
    setLoading(true);
    setResults(filteredResults);
    setLoading(false);
  }, [query]);

  return (
    <div className={twMerge("", className)}>
      {query && <Container>{text}</Container>}
    </div>
  );
};

export default SearchResult;
