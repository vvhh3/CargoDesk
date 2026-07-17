import { AppProviders } from "./app/providers"
import { AppRouter } from "./app/router"

function App() {
  return (
    <div className="bg-[#09090B] min-h-screen dark:bg-white">
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </div>
  )
}

export default App
