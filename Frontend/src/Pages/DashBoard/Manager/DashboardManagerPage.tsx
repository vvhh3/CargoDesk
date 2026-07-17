import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { RequestsTab } from "../../../features/orders/components/RequestsTab"

const stats = [
  { label: "На рассмотрении", value: "12", color: "from-[#F59E0B] to-[#D97706]", icon: AlertCircle },
  { label: "В работе", value: "28", color: "from-[#3B82F6] to-[#2563EB]", icon: Clock },
  { label: "Ожидает оплаты", value: "8", color: "from-[#8B5CF6] to-[#7C3AED]", icon: Clock },
  { label: "Завершено сегодня", value: "45", color: "from-[#22C55E] to-[#16A34A]", icon: CheckCircle },
]

export function DashboardManagerPage() {
  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="relative group">
                <div className={`absolute -inset-0.5 bg-linear-to-r ${stat.color} rounded-2xl blur opacity-20`}></div>
                <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          <RequestsTab />
        </div>
      </div>
    </div>
  )
}
