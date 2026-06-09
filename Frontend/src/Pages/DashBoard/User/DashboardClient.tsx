import { Package, Clock, CheckCircle2, TrendingUp } from "lucide-react"
// import { useStoreAuth } from "../../../Store/AuthStore"
import Card from "../../../Components/Dashboard/DashBoardItem/Card"
import Graf from "../../../Components/Dashboard/DashBoardItem/Graf"
import RecentActivity from "../../../Components/Dashboard/DashBoardItem/RecentActivity"
import RecentOrder from "../../../Components/Dashboard/DashBoardItem/Table/RecentOrder"

const DashboardClient = () => {

    // const user = useStoreAuth((store) => store.user)

    return (
        <div className="p-5">

            {/* Cards */}
            <div className="flex flex-1 flex-wrap gap-5">
                <Card icon={Package} colorGradien="from-[#7C3AED] to-[#8B5CF6]" colorBorder="[#8B5CF6]" colorShadow="[#8B5CF6]/70" value="248" title="Total Orders" />
                <Card icon={Clock} colorGradien="from-[#3B82F6] to-[#2563EB]" colorBorder="[#3B82F6]" colorShadow="[#2563EB]/70" value="99" title="In Progress" />
                <Card icon={CheckCircle2} colorGradien="from-[#22C55E] to-[#16A34A]" colorBorder="[#16A34A]" colorShadow="[#16A34A]/70" value="10" title="Completed" />
                <Card icon={TrendingUp} colorGradien="from-[#F59E0B] to-[#D97706]" colorBorder="[#F59E0B]" colorShadow="[#D97706]/70" value="4999₽" title="Total Spent" />
            </div>

            <div className="flex w-full gap-5 mt-10">

                <div className="w-3/5 rounded-2xl border border-white/10 bg-white/5 p-5 text-white">

                    <div className="w-full h-full">
                        {/* header */}
                        <div className="flex flex-col mb-6">
                            <h2 className="text-2xl">Orders Overview</h2>
                            <span className="text-sm text-zinc-400">Monthly order statistics</span>
                        </div>
                        <Graf />
                    </div>
                </div>

                <div className="w-2/5 rounded-2xl flex flex-col border gap-5 border-white/10 p-5 bg-white/5">
                    <span className="text-white">Recent Activity</span>
                    <RecentActivity text="Order #ORD-2847 was delivered" time="67 minute ago" color="[#16A34A]" />
                    <RecentActivity text="Order #ORD-2847 was delivered" time="67 hours ago" color="[#2563EB]" />
                    <RecentActivity text="Order #ORD-2847 was delivered" time="67 hours ago" color="[#2563EB]" />
                    <RecentActivity text="Order #ORD-2847 was delivered" time="67 day ago" color="red-500" />
                </div>
            </div>
            <div className="w-full rounded-2xl flex mt-10">
                <RecentOrder/>
            </div>
        </div>
    )
}

export default DashboardClient