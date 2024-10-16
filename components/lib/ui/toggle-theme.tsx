"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ToggleTheme() {
  const { toggleThemeFn, theme } = useTheme();
  return (
    <div
      className={`w-fit aspect-square border-[--border-color-secondary] flex m-1 border 
        rounded-full`}
    >
      <button type="button" onClick={toggleThemeFn} className="flex gap-1">
        {theme === "dark" ? "Turn-off NightMode" : "Turn-on NigthMode"}
        <DarkModeIcon />
      </button>
    </div>
  );
}
