"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface SearchHistoryProps {
  id: number;
  search: string;
  date: number;
}

interface SearchContextProps {
  isInFocus: boolean;
  setInFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchItems: SearchHistoryProps[];
  setSearchItems: React.Dispatch<React.SetStateAction<SearchHistoryProps[]>>;
  query: string | null;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

const DefaultContext: SearchContextProps = {
  isInFocus: false,
  setInFocus: () => {},
  searchItems: [],
  setSearchItems: () => {},
  query: null,
  setQuery: () => {},
};

const SearchContext = createContext<SearchContextProps>(DefaultContext);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [isInFocus, setInFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [searchItems, setSearchItems] = useState<SearchHistoryProps[]>([]);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setSearchItems(JSON.parse(searchHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchItems));
  }, [searchItems]);

  return (
    <SearchContext.Provider
      value={{
        isInFocus,
        setInFocus,
        query,
        setQuery,
        searchItems,
        setSearchItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
