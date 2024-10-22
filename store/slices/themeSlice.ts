import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the theme types

type ThemeState = "light" | "dark";

const savedTheme = localStorage.getItem("theme");
const initialState: ThemeState = (
  savedTheme ? JSON.parse(savedTheme) : "light"
) as ThemeState;

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(newTheme)); // Persist the theme in localStorage
      return newTheme; // Return the updated state
    },
  },
});

// Export the actions
export const { toggleTheme } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;
