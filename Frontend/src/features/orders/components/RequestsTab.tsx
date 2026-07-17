import { useState, useEffect } from "react"
import { Search, Eye } from "lucide-react"
import { ordersApi } from "../api/orders.api"
import { OrderDetailModal } from "./OrderDetailModal"
import { Badge } from "../../../shared/ui/Badge"
import type { Order, OrderStatus } from "../../../shared/types"
import toast from "react-hot-toast"

const tabs: OrderStatus[] = [
  "waitingManager",
  "approved",
  "rejected",
  "processing",
  "inTransit",
  "delivered",
  "cancelled",
]

const statusBadge: Record<OrderStatus, "warning" | "success" | "error" | "info" | "purple"> = {
  waitingManager: "warning",
  approved: "success",
  rejected: "error",
  processing: "info",
  inTransit: "purple",
  delivered: "success",
  cancelled: "error",
}

export function RequestsTab() {
  const [activeTab, setActiveTab] = useState<OrderStatus>(tabs[0])
  const [requests, setRequests] = useState<Order[]>([])
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getRequests = async () => {
    try {
      const res = await ordersApi.getManagerRequests()
      setRequests(res)
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "failed get data")
    }
  }

  useEffect(() => {
    getRequests()
  }, [selectedOrder])

  const filteredRequests = requests
    .filter((req) => req.status === activeTab)
    .filter((req) => {
      const s = search.toLowerCase()
      return (
        req.id.toString().includes(s) ||
        req.userId.toString().includes(s) ||
        req.product.toLowerCase().includes(s) ||
        req.brand.toLowerCase().includes(s) ||
        req.quantity.toString().includes(s)
      )
    })

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg transition-all text-sm ${
                activeTab === tab
                  ? "bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search requests..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="p-6 rounded-2xl bg-[#111113] border border-white/10 hover:border-[#7C3AED]/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-lg font-semibold text-[#7C3AED]">
                    Id: {request.id}
                  </span>
                  <span className="text-sm text-zinc-500">
                    Date: {new Date(request.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-6 mb-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Client id</div>
                    <div className="text-sm text-white font-medium">{request.userId}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Product</div>
                    <div className="text-sm text-white font-medium">{request.product}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Brand</div>
                    <div className="text-sm text-white font-medium">{request.brand}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Amount</div>
                    <div className="text-sm text-white font-medium">{request.quantity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Status</div>
                    <Badge variant={statusBadge[request.status] || "default"}>
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(request)}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OrderDetailModal selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </div>
  )
}
