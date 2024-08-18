import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import SmoothScrolling from "./SmoothScrolling";

const LocalProvider = ({ children }) => {
  return (
    <DataProvider>
      <ThemeProvider>
        <SmoothScrolling>{children}</SmoothScrolling>
      </ThemeProvider>
    </DataProvider>
  );
};

export default LocalProvider;
