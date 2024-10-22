import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
// Create the store with the slice reducer(s)
export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
