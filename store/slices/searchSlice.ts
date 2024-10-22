import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import filterSearchItems from "../types/filterSearchItems";

export interface SearchHistoryProps {
  id: number;
  search: string;
  date: number;
}

interface SearchState {
  isOpenSearch: boolean;
  isInfocus: boolean;
  searchItems: SearchHistoryProps[];
  query: string;
}

const initialState: SearchState = {
  isOpenSearch: false,
  isInfocus: false,
  searchItems: [],
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
