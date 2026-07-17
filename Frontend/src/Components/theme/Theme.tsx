import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

const Theme = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="w-full h-full p-2.5">
            <button
                onClick={toggleTheme}
                className="rounded-full flex justify-center items-center cursor-pointer
                transition-colors duration-500 hover:opacity-90 w-full">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
        </div>
    )
}

export default Theme