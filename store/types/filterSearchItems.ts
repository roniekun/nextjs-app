export interface SearchHistoryProps {
  id: number;
  search: string;
  date: number;
}

export interface SearchState {
  isOpenSearch: boolean;
  isInfocus: boolean;
  searchItems: SearchHistoryProps[];
  query: string;
}

type Props = {
  newSearch: SearchHistoryProps; // A single search item
  prevSearch: SearchHistoryProps[]; // Array of search items
};

const filterSearchItems = ({
  newSearch,
  prevSearch,
}: Props): SearchHistoryProps[] => {
  const newFilteredSearchItems = prevSearch.filter(
    (searchItem) => newSearch.search !== searchItem.search
  );

  // Combine newSearch with filtered previous searches
  const updatedSearchItems = [...newFilteredSearchItems, newSearch];
  const sortedSearchItems = updatedSearchItems.sort((a, b) => b.date - a.date);

  return sortedSearchItems;
};

export default filterSearchItems;
