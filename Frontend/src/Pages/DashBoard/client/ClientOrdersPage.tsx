import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { Button } from "../../../shared/ui/Button"
import { OrdersTable } from "../../../features/orders/components/OrdersTable"
import { useOrders } from "../../../features/orders"
import { useFilter } from "../../../shared/hooks/useFilter"
import toast from "react-hot-toast"
import * as XLSX from "xlsx"

export function ClientOrdersPage() {
  const [search, setSearch] = useState("")
  const { orders } = useOrders()

  const filtered = useFilter(orders, search, ["id", "product", "brand", "status", "price"])

  const exportToExcel = async () => {
    try {
      const rows = filtered.map((order) => ({
        ID: order.id,
        Продукт: order.product,
        Бренд: order.brand,
        Количество: order.quantity,
        Статус: order.status,
        Цена: order.price ?? "—",
        "Дата прихода": order.whenCamedate
          ? new Date(order.whenCamedate).toLocaleDateString("ru-RU")
          : "—",
      }))

      const worksheet = XLSX.utils.json_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders")

      worksheet["!cols"] = [
        { wch: 6 }, { wch: 25 }, { wch: 15 },
        { wch: 12 }, { wch: 18 }, { wch: 10 }, { wch: 15 },
      ]

      XLSX.writeFile(workbook, `orders_${new Date().toLocaleDateString("ru-RU")}.xlsx`)
      toast.success("Success")
    } catch (e) {
      toast.error("Failed to export orders")
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
            <Button variant="primary" onClick={exportToExcel}>
              <Download className="w-5 h-5" />
              Export
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search orders..." />
          </div>

          <div className="rounded-2xl bg-[#111113] border border-white/10 overflow-hidden">
            <OrdersTable orders={filtered} />
            <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
              <div className="text-sm text-zinc-400">All {filtered.length} orders</div>
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
