"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { toggleTheme } from "@/store/slices/themeSlice";

type Props = {
  className?: string;
  label?: string;
};

const ToggleTheme: React.FC<Props> = ({ className, label }) => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.setAttribute("theme", theme.theme);
  }, [theme]);

  return (
    <div className={twMerge(`w-fit aspect-square flex mx-1  `, className)}>
      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className="h-fit justify-center items-centerflex gap-1 whitespace-nowrap flex-nowrap uppercase"
      >
        {label}
        <DarkModeIcon />
      </button>
    </div>
  );
};
export default ToggleTheme;
