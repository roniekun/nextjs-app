import { MenuProvider } from "./context/MenuContext";
import { LayoutProvider } from "./context/LayoutContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import SmoothScroll from "./SmoothScroll";

type Props = {
  children: React.ReactNode;
};

const LocalProvider = ({ children }: Props) => {
  return (
    <SearchProvider>
      <LayoutProvider>
        <MenuProvider>
          <ThemeProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeProvider>
        </MenuProvider>
      </LayoutProvider>
    </SearchProvider>
  );
};

export default LocalProvider;
