"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

type Theme = "light" | "dark" | "system";

interface LoadedThemeType {
  loadedBg: string | null;
  loadedTextColor: string | null;
}

interface ThemeContextType {
  isScrolled: boolean;
  setTheme: (theme: Theme) => void;
  theme: string;
  isLoadedTheme: boolean | undefined;
  setIsLoadedTheme: (isLoaded: boolean) => void;
  toggleThemeFn: () => void;
  loadThemeFn: (theme: LoadedThemeType) => void;
  loadedTheme: LoadedThemeType;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultThemeContext: ThemeContextType = {
  isScrolled: false,
  setTheme: () => {},
  theme: "light", // Set a default theme
  isLoadedTheme: undefined,
  setIsLoadedTheme: () => {},
  toggleThemeFn: () => {},
  loadThemeFn: () => {},
  loadedTheme: {
    loadedBg: null,
    loadedTextColor: null,
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Handle scrolling
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Loading stored theme from local storage
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Toggling theme function
  const toggleThemeFn = () => {
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Loading theme from components
  const [isLoadedTheme, setIsLoadedTheme] = useState<boolean | undefined>(
    undefined
  );
  const [loadedTheme, setLoadedTheme] = useState<LoadedThemeType>({
    loadedBg: null,
    loadedTextColor: null,
  });

  const loadThemeFn = (theme: LoadedThemeType) => {
    setLoadedTheme(theme);
  };

  // Saving the theme to local storage
  useEffect(() => {
    // document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        isScrolled,
        setTheme,
        theme,
        isLoadedTheme,
        setIsLoadedTheme,
        toggleThemeFn,
        loadThemeFn,
        loadedTheme,
      }}
    >
      <div className={`theme ${theme} transition-all duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
