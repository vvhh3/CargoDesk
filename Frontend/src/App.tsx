import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Registry from "./Pages/Registry"
import LogIn from "./Pages/LogIn"
import Dashboard from "./Pages/Dashboard"
import { useEffect } from "react"
import { useStoreAuth } from "./Store/AuthStore"
import axios from "axios"

function App() {

  const setUser = useStoreAuth((state) => state.setUser)
  const logout = useStoreAuth((state) => state.logout)
  const setLoading = useStoreAuth((state) => state.setLoading)
  const isAuth = useStoreAuth((store) => store.isAuth)

  useEffect(() => {
    //Закидывать isAuth в локалсторадж
    const checkAuth = async () => {
      try {

        if (isAuth) {

          const res = await axios.get("http://localhost:5000/auth/me", {
            withCredentials: true
          })
          setUser(res.data.user)

        }
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  //   const isAuth = useAuthStore((state) => state.isAuth);
  // const isLoading = useAuthStore((state) => state.isLoading);
  // if (isLoading) return <div>Loading...</div>;
  // return isAuth ? <Account /> : <Navigate to="/login" />;

  return (

    <div className="bg-[#09090B] min-h-screen dark:bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registry />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
