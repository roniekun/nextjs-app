"use client";
import Button from "./button";
import { useTheme } from "@/provider/context/ThemeContext";

export default function ToggleTheme() {
  const { toggleThemeFn, theme } = useTheme();
  return (
    <Button className="border-none capitalize" handleClick={toggleThemeFn}>
      {theme}
    </Button>
  );
}
