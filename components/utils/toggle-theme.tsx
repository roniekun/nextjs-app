"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ToggleTheme() {
  const { toggleThemeFn, theme } = useTheme();
  return (
    <div className="flex gap-1">
      <button type="button" onClick={toggleThemeFn}>
        <DarkModeIcon />
      </button>
      <button type="button" onClick={toggleThemeFn}>
        <LightModeIcon />
      </button>
    </div>
  );
}
