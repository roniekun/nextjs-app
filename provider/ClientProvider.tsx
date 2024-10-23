"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@/store/hooks/hooks";
import { useEffect } from "react";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
