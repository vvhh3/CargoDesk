import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import RecentOrder from "../../../Components/Dashboard/DashBoardItem/Table/RecentOrder";
import { useState } from "react";
import toast from "react-hot-toast"
import * as XLSX from "xlsx";
type Order = {
    id: number,
    userId: number,
    product: string,
    brand: string,
    quantity: number,
    status: string | any,
    whenCamedate: string | null,
    price: number | null,
}

export default function ClientOrders() {

    const [search, setSearch] = useState("")

    const [orders, setOrders] = useState<Order[]>([])

    const ExportToExcecl = async () => {
        try {
            const rows = orders.map(order => ({
                "ID": order.id,
                "Продукт": order.product,
                "Бренд": order.brand,
                "Количество": order.quantity,
                "Статус": order.status,
                "Цена": order.price ?? "—",
                "Дата прихода": order.whenCamedate
                    ? new Date(order.whenCamedate).toLocaleDateString("ru-RU")
                    : "—",
            }))

            const worksheet = XLSX.utils.json_to_sheet(rows)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, "Orders")

            worksheet["!cols"] = [
                { wch: 6 }, { wch: 25 }, { wch: 15 },
                { wch: 12 }, { wch: 18 }, { wch: 10 }, { wch: 15 }
            ]

            XLSX.writeFile(workbook, `orders_${new Date().toLocaleDateString("ru-RU")}.xlsx`)
        } catch (e) {
            toast.error("Failed to eexport orders")
        }
    }
    return (

        <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8">

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">All Orders</h2>
                            <p className="text-zinc-400">Manage and track all your orders</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all cursor-pointer"
                        onClick={ExportToExcecl}>
                            <Download className="w-5 h-5" />
                            Export
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">

                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#111113] border border-white/10 overflow-hidden">
                        <RecentOrder search={search} onOrderLoader={setOrders} />
                        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
                            <div className="text-sm text-zinc-400">
                                Showing 1-5 of 248 orders
                            </div>
                            <div className="flex items-center gap-2">

                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">1</button>
                                <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">2</button>

                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
