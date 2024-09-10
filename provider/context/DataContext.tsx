"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface DataContextProps {
  isMobile: boolean;
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
  setDesktop: React.Dispatch<React.SetStateAction<boolean>>;
  isToggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultContext: DataContextProps = {
  isMobile: false,
  setMobile: () => {},
  isDesktop: false,
  setDesktop: () => {},
  isToggleMenu: false,
  setToggleMenu: () => {},
};

const DataContext = createContext<DataContextProps>(DefaultContext);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [isToggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setMobile] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
      setDesktop(window.innerWidth >= 1024);
      setToggleMenu(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isToggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isToggleMenu]);

  return (
    <DataContext.Provider
      value={{
        isMobile,
        setMobile,
        isDesktop,
        setDesktop,
        isToggleMenu,
        setToggleMenu,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
