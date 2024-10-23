import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hooks";
import { setTheme } from "@/app/redux/slices/themeSlice";
import cookie from "js-cookie";

const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  useLayoutEffect(() => {
    const cookieTheme = cookie.get("theme") as typeof theme;
    document.body.setAttribute("data-theme", cookieTheme);
    dispatch(setTheme(cookieTheme));
  }, [dispatch]);

  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
