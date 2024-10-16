"use client";
import { useTheme } from "@/provider/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useLayout } from "@/provider/context/LayoutContext";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const ToggleTheme: React.FC<Props> = ({ className }) => {
  const { toggleThemeFn, theme } = useTheme();
  const { isDesktop } = useLayout();
  return (
    <div className={twMerge(`w-fit aspect-square flex mx-1  `, className)}>
      <button
        type="button"
        onClick={toggleThemeFn}
        className="h-fit justify-center items-centerflex gap-1 whitespace-nowrap flex-nowrap uppercase"
      >
        {/* {isDesktop &&
          (theme === "dark" ? "Turn-off NightMode" : "Turn-on NigthMode")} */}
        <DarkModeIcon />
      </button>
    </div>
  );
};
export default ToggleTheme;
