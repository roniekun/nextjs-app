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
  status: "Deleted" | "Default";
}

interface SearchContextProps {
  searchItems: SearchItemProps[];
  setSearchItem: React.Dispatch<React.SetStateAction<SearchItemProps[]>>;
}

const DefaultContext: SearchContextProps = {
  searchItems: [],
  setSearchItem: () => {},
};

const SearchContext = createContext<SearchContextProps>(DefaultContext);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
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
        searchItems,
        setSearchItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
