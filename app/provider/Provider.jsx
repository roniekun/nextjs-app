import { ThemeProvider } from "./context/ThemeContext"

const Provider = ({ children }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default Provider



