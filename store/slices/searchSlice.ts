import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import filterSearchItems from "../types/filterSearchItems";
import { SearchState, SearchHistoryProps } from "../types/filterSearchItems";

let searchHistory: SearchHistoryProps[] = [];

if (typeof window !== "undefined") {
  try {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) {
      searchHistory = JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error("Failed to parse search history from localStorage", error);
    searchHistory = [];
  }
}

const initialState: SearchState = {
  isOpenSearch: false,
  isInfocus: false,
  searchItems: searchHistory,
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOpenSearch: (state, action: PayloadAction<boolean>) => {
      state.isOpenSearch = action.payload;
    },

    toggleOpenSearch: (state) => {
      state.isOpenSearch = !state.isOpenSearch;
    },

    setInfocus: (state, action: PayloadAction<boolean>) => {
      state.isInfocus = action.payload;
    },

    setSearchItems: (state, action: PayloadAction<SearchHistoryProps[]>) => {
      state.searchItems = action.payload;

      if (state.searchItems) {
        localStorage.setItem("history", JSON.stringify(state.searchItems));
      }
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    addSearchItem: (state, action: PayloadAction<SearchHistoryProps>) => {
      const newSearch = action.payload;

      state.searchItems = filterSearchItems({
        newSearch,
        prevSearch: state.searchItems,
      });

      if (typeof window !== "undefined") {
        try {
          if (state.searchItems) {
            localStorage.setItem("history", JSON.stringify(state.searchItems));
          }
        } catch (error) {
          console.error("Failed to save search history to localStorage", error);
        }
      }
    },
  },
});

export const {
  setOpenSearch,
  toggleOpenSearch,
  setInfocus,
  setSearchItems,
  setQuery,
  addSearchItem,
} = searchSlice.actions;

export default searchSlice.reducer;
