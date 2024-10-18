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
  isOpenSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isInFocus: boolean;
  setInFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchItems: SearchHistoryProps[];
  setSearchItems: React.Dispatch<React.SetStateAction<SearchHistoryProps[]>>;
  query: string | null;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

const DefaultContext: SearchContextProps = {
  isOpenSearch: false,
  setOpenSearch: () => {},
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
  const [isOpenSearch, setOpenSearch] = useState<boolean>(false);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setSearchItems(JSON.parse(searchHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchItems));
  }, [searchItems]);

  useEffect(() => {
    if (isOpenSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isOpenSearch]);

  return (
    <SearchContext.Provider
      value={{
        isOpenSearch,
        setOpenSearch,
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
