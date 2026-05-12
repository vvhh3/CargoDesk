import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"

function App() {

  return (

    <div className="bg-[#09090B] min-h-screen dark:bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
