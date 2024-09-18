import { useState, useEffect } from "react";
import { contentData, IContentData } from "@/data/content-data";
// Custom hook for filtering results
const filterResults = (query: string | null): [IContentData[], boolean] => {
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

export default filterResults;
