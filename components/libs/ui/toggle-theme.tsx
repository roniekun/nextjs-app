"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ToggleTheme() {
  const { toggleThemeFn, theme } = useTheme();
  return (
    <div
      className={`text-[--text-color-secondary] w-fit aspect-square border-[--border-color-secondary] flex m-1 border 
        rounded-full`}
    >
      <button type="button" onClick={toggleThemeFn}>
        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </div>
  );
}
