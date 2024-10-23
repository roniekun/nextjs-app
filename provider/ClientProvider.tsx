"use client";
import store from "@/app/redux/store";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default ClientProvider;
