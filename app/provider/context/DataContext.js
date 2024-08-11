import { createContext, useState, useEffect } from "react";
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const defaultColor = "black";
    const defaultBgColor = "transparent";

    const [title, setTitle] = useState(document.title);
    const [isLoading, setLoading] = useState(true);
    const [isTransition, setIsTransition] = useState(false);
    const [color, setColor] = useState(defaultColor);
    const [bgColor, setBgColor] = useState(defaultBgColor);
    const [isToggleMenu, setToggleMenu] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [pathData, setPathData] = useState({ path: null, color: null })
    const [isMobile, setMobile] = useState(false);
    const [isDesktop, setDesktop] = useState(false);
    const [scrollRef, setScrollRef] = useState();
    const [yProgress, setYProgress] = useState(0);
    const [inView, setInView] = useState(false);

    const user = {
        title: "Ronie Benitez",
        name: "Ronie Benitez",
        email: "roniebenitez01@gmail.com",
        subject: "New Project",
    };


    //dynamic document title
    useEffect(() => {
        document.title = title;
    }, [title]);

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

    //toggling menu
    useEffect(() => {
        if (isToggleMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isToggleMenu]);

    useEffect(() => {
        setTimeout(() => {
            setIsTransition(false);
        }, 1000);
    }, [isTransition]);

    return (
        <DataContext.Provider
            value={{
                pathData,
                setPathData,
                user,
                scrollRef,
                setScrollRef,
                defaultColor,
                defaultBgColor,
                color,
                bgColor,
                setColor,
                setBgColor,
                title,
                setTitle,
                isLoading,
                setLoading,
                isTransition,
                setIsTransition,
                isScrolled,
                isMobile,
                setMobile,
                isDesktop,
                setDesktop,
                setToggleMenu,
                isToggleMenu,
                yProgress,
                setYProgress,
                inView,
                setInView,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider, DataContext };

// export const useStoredContext = () => { return useContext(DataContext)}