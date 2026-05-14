import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Registry from "./Pages/Registry"
import LogIn from "./Pages/LogIn"
function App() {

  return (

    <div className="bg-[#09090B] min-h-screen dark:bg-white">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registry" element={<Registry />} />
            <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
