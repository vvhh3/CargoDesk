import { useStoreAuth } from "../Store/AuthStore"
import { Package,Clock,CheckCircle2,TrendingUp } from "lucide-react"
const DashboardClient = () => {

    const user = useStoreAuth((store) => store.user)
    console.log("user", user)


    return (
        <div className="p-5">

            {/* Cards */}
            <div className="flex flex-1 flex-wrap gap-5">

                <div className="flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-[#8B5CF6] p-6
                hover:scale-102 shadow-lg duration-500 hover:shadow-[#8B5CF6]/70">
                    <div className="flex justify-between w-full">
                        <div className="w-12 h-12 flex justify-center items-center bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] rounded-xl text-white">
                            <Package className="w-6 h-6"/>
                        </div>
                        {/* <span className="text-green-500">+12.5%</span> */}
                    </div>
                    <span className="text-3xl text-white font-bold mb-1">248</span>
                    <span className="text-zinc-400">Total Orders</span>
                </div>

                <div className="flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-[#3B82F6] p-6
                hover:scale-102 shadow-lg duration-500 hover:shadow-[#2563EB]/70">
                    <div className="flex justify-between w-full">
                        <div className="w-12 h-12 flex justify-center items-center bg-linear-to-r from-[#3B82F6] to-[#2563EB] rounded-xl text-white">
                            <Clock className="w-6 h-6"/>
                        </div>
                        {/* <span className="text-green-500">+12.5%</span> */}
                    </div>
                    <span className="text-3xl text-white font-bold mb-1">99</span>
                    <span className="text-zinc-400">In Progress</span>
                </div>

                <div className="flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-[#16A34A] p-6
                hover:scale-102 shadow-lg duration-500 hover:shadow-[#16A34A]/70">
                    <div className="flex justify-between w-full">
                        <div className="w-12 h-12 flex justify-center items-center bg-linear-to-r from-[#22C55E] to-[#16A34A] rounded-xl text-white">
                            <CheckCircle2 className="w-6 h-6"/>
                        </div>
                        {/* <span className="text-green-500">+12.5%</span> */}
                    </div>
                    <span className="text-3xl text-white font-bold mb-1">10</span>
                    <span className="text-zinc-400">Completed</span>
                </div>

                <div className="flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-[#F59E0B] p-6
                hover:scale-102 shadow-lg duration-500 hover:shadow-[#D97706]/70">
                    <div className="flex justify-between w-full">
                        <div className="w-12 h-12 flex justify-center items-center bg-linear-to-r from-[#F59E0B] to-[#D97706] rounded-xl text-white">
                            <TrendingUp className="w-6 h-6"/>
                        </div>
                        {/* <span className="text-green-500">+12.5%</span> */}
                    </div>
                    <span className="text-3xl text-white font-bold mb-1">4999₽</span>
                    <span className="text-zinc-400">Total Spent</span>
                </div>

            </div>

        </div>
    )
}

export default DashboardClient