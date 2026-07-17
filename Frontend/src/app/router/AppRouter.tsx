import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute"
import { DashboardLayout } from "./DashboardLayout"


import { HomePage } from "../../Pages/HomePage"
import { LoginPage } from "../../Pages/auth/LoginPage"
import { RegisterPage } from "../../Pages/auth/RegisterPage"
import { DashboardClientPage } from "../../Pages/DashBoard/client"
import { ClientOrdersPage } from "../../Pages/DashBoard/client/ClientOrdersPage"
import { ClientCreateRequestPage } from "../../Pages/DashBoard/client/ClientCreateRequestPage"
import { ClientNotificationsPage } from "../../Pages/notifications"
import { DashboardAdminPage } from "../../Pages/DashBoard/Admin"
import { AdminUsersPage } from "../../Pages/DashBoard/Admin/AdminUsersPage"
import { AdminOrdersPage } from "../../Pages/DashBoard/Admin/AdminOrdersPage"
import { AdminSettingsPage } from "../../Pages/DashBoard/Admin/AdminSettingsPage"
import { DashboardManagerPage } from "../../Pages/DashBoard/Manager"
import { ManagerOrdersPage } from "../../Pages/DashBoard/Manager/ManagerOrdersPage"
import { ManagerUsersPage } from "../../Pages/DashBoard/Manager/ManagerUsersPage"

export function AppRouter() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/client" element={<DashboardClientPage />} />
          <Route path="/dashboard/client/orders" element={<ClientOrdersPage />} />
          <Route
            path="/dashboard/client/create-request"
            element={<ClientCreateRequestPage />}
          />
          <Route path="/notifications" element={<ClientNotificationsPage />} />

          <Route path="/dashboard/admin" element={<DashboardAdminPage />} />
          <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
          <Route path="/dashboard/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />

          <Route path="/dashboard/manager" element={<DashboardManagerPage />} />
          <Route path="/dashboard/manager/orders" element={<ManagerOrdersPage />} />
          <Route
            path="/dashboard/manager/clients"
            element={<ManagerUsersPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
