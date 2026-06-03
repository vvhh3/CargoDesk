import { Search, Filter, Eye, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

const tabs = ['На рассмотрении', 'В работе', 'Ожидает оплаты', 'Завершён', 'Отклонён'];

const requests = [
  { id: '#REQ-2847', client: 'John Smith', product: 'iPhone 15 Pro Max', amount: '$1,299', date: '2 hours ago', priority: 'high', tab: 'На рассмотрении', description: '256GB, Space Black' },
  { id: '#REQ-2846', client: 'Sarah Johnson', product: 'MacBook Pro 16"', amount: '$2,499', date: '5 hours ago', priority: 'high', tab: 'В работе', description: 'M3 Max, 64GB RAM' },
  { id: '#REQ-2845', client: 'Michael Brown', product: 'AirPods Pro', amount: '$249', date: '1 day ago', priority: 'medium', tab: 'В работе', description: '2nd Generation, USB-C' },
  { id: '#REQ-2844', client: 'Emily Davis', product: 'iPad Air', amount: '$599', date: '2 days ago', priority: 'low', tab: 'Ожидает оплаты', description: '11-inch, Wi-Fi, 256GB' },
  { id: '#REQ-2843', client: 'David Wilson', product: 'Apple Watch Series 9', amount: '$429', date: '3 days ago', priority: 'medium', tab: 'Завершён', description: 'GPS + Cellular, 45mm' },
];

const stats = [
  { label: 'На рассмотрении', value: '12', color: 'from-[#F59E0B] to-[#D97706]', icon: AlertCircle },
  { label: 'В работе', value: '28', color: 'from-[#3B82F6] to-[#2563EB]', icon: Clock },
  { label: 'Ожидает оплаты', value: '8', color: 'from-[#8B5CF6] to-[#7C3AED]', icon: Clock },
  { label: 'Завершено сегодня', value: '45', color: 'from-[#22C55E] to-[#16A34A]', icon: CheckCircle },
];

export default function DashboardManager() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const filteredRequests = requests.filter((req) => req.tab === activeTab);

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

          <div className="mb-6">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-lg transition-all text-sm ${activeTab === tab ? 'bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-white' : 'text-zinc-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input type="text" placeholder="Search requests..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map((request, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#111113] border border-white/10 hover:border-[#7C3AED]/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-lg font-semibold text-[#7C3AED]">{request.id}</span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${request.priority === 'high' ? 'bg-[#EF4444]/10 text-[#EF4444]' : request.priority === 'medium' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#3B82F6]/10 text-[#3B82F6]'}`}>
                        {request.priority.toUpperCase()}
                      </span>
                      <span className="text-sm text-zinc-500">{request.date}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-6 mb-4">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Client</div>
                        <div className="text-sm text-white font-medium">{request.client}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Product</div>
                        <div className="text-sm text-white font-medium">{request.product}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Description</div>
                        <div className="text-sm text-zinc-400">{request.description}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Amount</div>
                        <div className="text-sm text-white font-medium">{request.amount}</div>
                      </div>
                    </div>

                    <button className="px-4 py-2 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
