import { Moon, Sun } from "lucide-react"
import { useTheme } from './Components/theme/ThemeProvider'


function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="">
      <div className="mx-auto flex items-center py-4 px-4">
        <button
          onClick={toggleTheme}
          className="rounded-full flex justify-center items-center
        text-black cursor-pointer transition-colors duration-300 hover:opacity-90  dark:text-black"
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>

    </div>
  )
}

export default App
