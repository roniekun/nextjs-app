import { SearchHistoryProps } from "@/provider/context/SearchContext";

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

  updatedSearchItems.sort((a, b) => b.date - a.date);

  return updatedSearchItems;
};

export default filterSearchItems;
