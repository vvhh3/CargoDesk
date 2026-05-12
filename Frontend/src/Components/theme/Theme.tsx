import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

const Theme = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="w-fit h-fit">
            <button
            onClick={toggleTheme}
            className="rounded-full flex justify-center items-center
          text-white cursor-pointer transition-colors duration-300 hover:opacity-90  dark:text-black"
            >
                {theme === 'light' ? <Moon /> : <Sun />}
            </button>
        </div>
    )
}

export default Theme