import { Search } from "lucide-react"
import RecentOrder from "../../../Components/Dashboard/DashBoardItem/Table/RecentOrder"
import { useState } from "react"


export default function ManagerOrders() {
    
    const [search, setSearch] = useState("")

    return (
        <div className="p-5">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input type="text" placeholder="Search orders..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <RecentOrder search={search}/>
        </div>
    )
}
