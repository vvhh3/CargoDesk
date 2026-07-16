import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Registry from "./Pages/Registry"
import LogIn from "./Pages/LogIn"

// import DashboardAdmin from "./Pages/DashBoard/Admin/DashboardAdmin"
import ClientCreateRequest from "./Pages/DashBoard/User/ClientCreateRequest"

import { useEffect } from "react"
import { useStoreAuth } from "./Store/AuthStore"

import axios from "axios"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import DashBoardLayout from "./Components/Dashboard/DashBoardlayout/DashBoardLayout"

import { Toaster } from "react-hot-toast"
import ManagerOrders from "./Pages/DashBoard/Manager/ManagerOrders"
import DashboardClient from "./Pages/DashBoard/User/DashboardClient"
import DashboardAdmin from "./Pages/DashBoard/Admin/DashboardAdmin"
import ManagerUsers from "./Pages/DashBoard/Manager/ManagerUsers"
import DashboardManager from "./Pages/DashBoard/Manager/DashboardManager"
import ClientOrders from "./Pages/DashBoard/User/ClientOrders"
import { ClientNotifications } from "./Pages/DashBoard/User/ClientNotifications"
import AdminUser from "./Pages/DashBoard/Admin/AdminUser"
import AdminOrders from "./Pages/DashBoard/Admin/AdminOrders"
import AdminSettings from "./Pages/DashBoard/Admin/AdminSettings"
import { useQuery } from "@tanstack/react-query"

function App() {

  const setUser = useStoreAuth((state) => state.setUser)
  const logout = useStoreAuth((state) => state.logout)
  const setLoading = useStoreAuth((state) => state.setLoading)


  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true
      })
      setUser(res.data.user)
      
      return res.data
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {

  //   checkAuth()
  // }, [])

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    staleTime: 5000,
  })

  if(isError) return <p className="text-red-500">Ошибка Запроса</p>

  return (

    <div className="bg-[#09090B] min-h-screen dark:bg-white">

      {/* уведомления */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#22c55e",
            },
          },

          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          },
        }}
      />

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
            <Route path="/dashboard/client/orders" element={<ClientOrders />} />
            <Route path="/dashboard/client/create-request" element={<ClientCreateRequest />} />
            <Route path="/notifications" element={<ClientNotifications />} />

            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
            <Route path="/dashboard/admin/users" element={<AdminUser />} />
            <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

            <Route path="/dashboard/manager" element={<DashboardManager />} />
            <Route path="/dashboard/manager/orders" element={<ManagerOrders />} />
            <Route path="/dashboard/manager/clients" element={<ManagerUsers />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
