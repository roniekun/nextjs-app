"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface MenuContextProps {
  isToggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultContext: MenuContextProps = {
  isToggleMenu: false,
  setToggleMenu: () => {},
};

const MenuContext = createContext<MenuContextProps>(DefaultContext);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [isToggleMenu, setToggleMenu] = useState<boolean>(false);

  useEffect(() => {
    if (isToggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isToggleMenu]);

  return (
    <MenuContext.Provider
      value={{
        isToggleMenu,
        setToggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
