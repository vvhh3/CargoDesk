import {
  CheckCircle2,
  XCircle,
  DollarSign,
  Truck,
  Bell,
  Package,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle2,
    title: "Order Delivered",
    message: "Your order #ORD-2847 has been delivered",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "info",
    icon: Truck,
    title: "Order In Transit",
    message: "Order #ORD-2846 is now in transit",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    icon: DollarSign,
    title: "Payment Processed",
    message: "Payment of $2,499.00 processed successfully",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    icon: Package,
    title: "Order Confirmed",
    message: "Your order #ORD-2845 has been confirmed",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "error",
    icon: XCircle,
    title: "Order Cancelled",
    message: "Order #ORD-2843 has been cancelled",
    time: "3 days ago",
    read: true,
  },
]

export function ClientNotificationsPage() {
  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Notifications
                </h2>
                <p className="text-zinc-400">
                  Stay updated with your order activities
                </p>
              </div>
              <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm">
                Mark all as read
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#111113] border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">3</div>
                    <div className="text-sm text-zinc-400">Unread</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111113] border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">24</div>
                    <div className="text-sm text-zinc-400">This Week</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111113] border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">4.8</div>
                    <div className="text-sm text-zinc-400">Rating</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    n.read
                      ? "bg-white/3 border-white/5"
                      : "bg-[#111113] border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        n.type === "success"
                          ? "bg-green-500/10"
                          : n.type === "error"
                          ? "bg-red-500/10"
                          : "bg-blue-500/10"
                      }`}
                    >
                      <n.icon
                        className={`w-5 h-5 ${
                          n.type === "success"
                            ? "text-[#22C55E]"
                            : n.type === "error"
                            ? "text-[#EF4444]"
                            : "text-[#3B82F6]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{n.title}</span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#7C3AED] shrink-0"></span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400">{n.message}</p>
                      <span className="text-xs text-zinc-600 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
