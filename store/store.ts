import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import searchReducer from "./slices/searchSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  theme: themeReducer,
  search: searchReducer,
});
// Create the store with the slice reducer(s)
export const store = configureStore({
  reducer: reducers,
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
