'use client'
import { createContext, useState, useEffect } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    //custom themes
    const light = {
        name: "light",
        textColorPrimary: "#171717", //text-neutral-900
        textColorSecondary: "#262626", //text-neutral-800
        borderColor: "#171717", //"border-neutral-900",
        bg: "#F5F5F5",
    };

    const dark = {
        name: "dark",
        textColorPrimary: "#E5E5E5", //text-neutral-200
        textColorSecondary: "#A3A3A3", //text-neutral-400
        borderColor: "#A3A3A3", ////bg-neutral-400
        bg: "#171717", //bg-neutral-900
    };

    //handle scrolling 
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
            return () => {
                setIsScrolled(false);
            };
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //loading stored theme from local storage
    const [theme, setTheme] = useState(light);

    useEffect(() => {
        const saveTheme = JSON.parse(localStorage.getItem("theme"));
        if (saveTheme) {
            setTheme(saveTheme)
        }
    }, [])

    //toggling theme function
    const toggleThemeFn = () => {
        setTheme(theme.name === "light" ? dark : light);
        localStorage.setItem("theme", JSON.stringify(theme));
    };

    //loading theme from components
    const [isLoadedTheme, setIsLoadedTheme] = useState();
    const [loadedTheme, setLoadedTheme] = useState({
        loadedBg: null,
        loadedTextColor: null,
    });

    const loadThemeFn = (theme) => {
        setLoadedTheme(theme);
    };

    //saving the theme to local storage
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                isScrolled,
                setTheme,
                theme,
                dark,
                light,
                isLoadedTheme,
                setIsLoadedTheme,
                toggleThemeFn,
                loadThemeFn,
                loadedTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

//useTheme hook
export const useTheme = () => {
    return useContext(ThemeContext);
};