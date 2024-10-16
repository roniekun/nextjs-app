"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useLayout } from "@/provider/context/LayoutContext";

export default function ToggleTheme() {
  const { toggleThemeFn, theme } = useTheme();
  const { isDesktop } = useLayout();
  return (
    <div
      className={`w-fit aspect-square border-[--border-color-secondary] flex m-1 border `}
    >
      <button
        type="button"
        onClick={toggleThemeFn}
        className="flex gap-1 whitespace-nowrap flex-nowrap"
      >
        {isDesktop &&
          (theme === "dark" ? "Turn-off NightMode" : "Turn-on NigthMode")}
        <DarkModeIcon />
      </button>
    </div>
  );
}
