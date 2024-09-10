import { DataProvider } from "./context/DataContext";
import SmoothScrolling from "./SmoothScrolling";
import { ThemeProvider } from "./context/ThemeContext";

type Props = {
  children: React.ReactNode;
};

const LocalProvider = ({ children }: Props) => {
  return (
    <DataProvider>
      <ThemeProvider>
        <SmoothScrolling>{children}</SmoothScrolling>
      </ThemeProvider>
    </DataProvider>
  );
};

export default LocalProvider;
