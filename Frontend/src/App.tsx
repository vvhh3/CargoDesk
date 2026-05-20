import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Registry from "./Pages/Registry"
import LogIn from "./Pages/LogIn"
import DashboardClient from "./Pages/DashboardClient"
import DashboardAdmin from "./Pages/DashboardAdmin"
import ClientCreate from "./Pages/ClientCreate"
import { useEffect } from "react"
import { useStoreAuth } from "./Store/AuthStore"
import axios from "axios"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import DashBoardLayout from "./Components/Dashboard/DashBoardlayout/DashBoardLayout"

function App() {

  const setUser = useStoreAuth((state) => state.setUser)
  const logout = useStoreAuth((state) => state.logout)
  const setLoading = useStoreAuth((state) => state.setLoading)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true
        })
        setUser(res.data.user)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])


  return (

    <div className="bg-[#09090B] min-h-screen dark:bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registry />} />
          <Route path="/login" element={<LogIn />} />

          <Route element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard/client" element={<DashboardClient />} />
            <Route path="/dashboard/client/create-request" element={<ClientCreate />} />
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
