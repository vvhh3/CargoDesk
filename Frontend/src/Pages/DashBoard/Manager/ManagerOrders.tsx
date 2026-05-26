import { useState } from "react"
import RecentOrder from "../../../Components/Dashboard/DashBoardItem/Table/RecentOrder"
import TableUser from "../../../Components/Dashboard/DashBoardItem/Table/TableUser"


export default function ManagerOrders() {

    return (
        <div>
            <RecentOrder/>
            <TableUser/>
        </div>
    )
}
