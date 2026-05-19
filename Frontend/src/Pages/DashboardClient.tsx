import { useStoreAuth } from "../Store/AuthStore"
import { Package, Clock, CheckCircle2, TrendingUp } from "lucide-react"

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 60 },
    { month: "May", value: 55 },
    { month: "Jun", value: 68 },
    { month: "Jul", value: 72 },
    { month: "Aug", value: 69 },
    { month: "Sep", value: 78 },
    { month: "Oct", value: 85 },
    { month: "Nov", value: 82 },
    { month: "Dec", value: 92 },
];

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
                            <Package className="w-6 h-6" />
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
                            <Clock className="w-6 h-6" />
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
                            <CheckCircle2 className="w-6 h-6" />
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
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        {/* <span className="text-green-500">+12.5%</span> */}
                    </div>
                    <span className="text-3xl text-white font-bold mb-1">4999₽</span>
                    <span className="text-zinc-400">Total Spent</span>
                </div>

            </div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-white">

                {/* header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl">Orders Overview</h2>
                        <p className="text-sm text-zinc-400">
                            Monthly order statistics
                        </p>
                    </div>
                </div>

                <div className="h-60 w-full">

                    {/* контейнер графика */}
                    <AreaChart data={data} width="100%" height="100%">

                        {/* закрашивание фона */}
                        {/* SVG-блок для заранее объявленных эффектов, которые потом можно использовать. */}
                        <defs>
                            {/* Градиент (плавный переход цвета), который потом используется как заливка области. */}
                            <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
                                {/* Первая точка градиента (верх) */}
                                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                                {/* конец градиента */}
                                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* Фоновые линии (как в Excel графиках) */}
                        <CartesianGrid stroke='#1f1f1f' />
                        {/* Горизонтальная ось (время, месяцы и т.д.) */}
                        <XAxis dataKey="month" stroke="#6b7280" />
                        {/* Вертикальная ось (значения) */}
                        <YAxis stroke="#6b7280" />

                        {/* Окно, которое появляется при наведении */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111',
                                border: "1px solid #2a2a2a",
                                borderRadius: "10px",
                                color: "#fff",
                            }}
                        />

                        {/* сам график */} 
                        <Area
                            type="monotone" // тип кривой. Другие варианты: linear, step
                            dataKey="value" // откуда брать данные (value)
                            stroke="#a855f7"
                            strokeWidth={2}
                            fill="url(#purpleFill)" //использует градиент из <defs>
                        />
                    </AreaChart>
                </div>
            </div>
        </div>
    )
}

export default DashboardClient