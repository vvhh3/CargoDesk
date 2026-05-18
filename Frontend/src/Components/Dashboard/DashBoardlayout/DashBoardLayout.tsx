import { Sidebar } from "../DashboardNav/DashboardNav"
import TopBar from "../TopBarDashboard/TopBar"
import { Outlet } from "react-router-dom"


const DashBoardLayout = () => {

    return (
        <div className="min-h-screen">
            <Sidebar />

            <div className="ml-64 min-h-screen">
                <TopBar title="Dashboard" />
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default DashBoardLayout