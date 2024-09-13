"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextProps {
  searchItem: string | null;
  setSearchItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const DefaultContext: SearchContextProps = {
  searchItem: null,
  setSearchItem: () => {},
};

const SearchContext = createContext<SearchContextProps>(DefaultContext);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchItem, setSearchItem] = useState<string | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchItem,
        setSearchItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
