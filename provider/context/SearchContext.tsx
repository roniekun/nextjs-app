"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface SearchItemProps {
  history: string;
  status: "deleted" | "default";
}

interface SearchContextProps {
  isInFocus: boolean;
  setInFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchItems: SearchItemProps[];
  setSearchItem: React.Dispatch<React.SetStateAction<SearchItemProps[]>>;
  query: string | null;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

const DefaultContext: SearchContextProps = {
  isInFocus: false,
  setInFocus: () => {},
  searchItems: [],
  setSearchItem: () => {},
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
  const [searchItems, setSearchItem] = useState<SearchItemProps[]>([]);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setSearchItem(JSON.parse(searchHistory));
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
        setSearchItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
