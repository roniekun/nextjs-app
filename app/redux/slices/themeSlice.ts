import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "js-cookie";

interface ThemeState {
  theme: "light" | "dark";
}

const getInitialTheme = (): "light" | "dark" => {
  const cookieTheme = cookie.get("theme");
  return cookieTheme === "dark" ? "dark" : "light"; // Default to 'light'
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      cookie.set("theme", state.theme); // Persist in cookies
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      cookie.set("theme", state.theme); // Persist in cookies
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
