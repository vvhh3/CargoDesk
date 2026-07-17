import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <TopBar title="Dashboard" />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
