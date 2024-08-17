import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

const LocalProvider = ({ children }) => {
  return (
    <DataProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </DataProvider>
  );
};

export default LocalProvider;
