"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  label?: string;
};

const ToggleTheme: React.FC<Props> = ({ className, label }) => {
  const { toggleThemeFn } = useTheme();
  return (
    <div className={twMerge(`w-fit aspect-square flex mx-1  `, className)}>
      <button
        type="button"
        onClick={toggleThemeFn}
        className="h-fit justify-center items-centerflex gap-1 whitespace-nowrap flex-nowrap uppercase"
      >
        {label}
        <DarkModeIcon />
      </button>
    </div>
  );
};
export default ToggleTheme;
