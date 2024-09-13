"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface LayoutContextProps {
  isMobile: boolean;
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
  setDesktop: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultContext: LayoutContextProps = {
  isMobile: false,
  setMobile: () => {},
  isDesktop: false,
  setDesktop: () => {},
};

const LayoutContext = createContext<LayoutContextProps>(DefaultContext);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isMobile, setMobile] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
      setDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        setMobile,
        isDesktop,
        setDesktop,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
