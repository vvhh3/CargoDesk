import { Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react";
import RecentOrder from "../../../Components/Dashboard/DashBoardItem/Table/RecentOrder";

const orders = [
    { id: '#ORD-2847', client: 'John Smith', product: 'iPhone 15 Pro Max', status: 'Delivered', date: 'May 11, 2026', amount: '$1,299', payment: 'Paid' },
    { id: '#ORD-2846', client: 'Sarah Johnson', product: 'MacBook Pro 16"', status: 'In Transit', date: 'May 11, 2026', amount: '$2,499', payment: 'Paid' },
    { id: '#ORD-2845', client: 'Michael Brown', product: 'AirPods Pro', status: 'Processing', date: 'May 10, 2026', amount: '$249', payment: 'Pending' },
    { id: '#ORD-2844', client: 'Emily Davis', product: 'iPad Air', status: 'Delivered', date: 'May 09, 2026', amount: '$599', payment: 'Paid' },
    { id: '#ORD-2843', client: 'David Wilson', product: 'Apple Watch Series 9', status: 'Cancelled', date: 'May 08, 2026', amount: '$429', payment: 'Refunded' },
];

const statusStyles = {
    Delivered: 'bg-[#22C55E]/10 text-[#22C55E]',
    'In Transit': 'bg-[#3B82F6]/10 text-[#3B82F6]',
    Processing: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    Cancelled: 'bg-[#EF4444]/10 text-[#EF4444]',
};

const paymentStyles = {
    Paid: 'bg-[#22C55E]/10 text-[#22C55E]',
    Pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    Refunded: 'bg-[#71717A]/10 text-[#71717A]',
};


export default function ClientOrders() {

    return (
        <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">All Orders</h2>
                            <p className="text-zinc-400">Manage and track all your orders</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all">
                            <Download className="w-5 h-5" />
                            Export
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input type="text" placeholder="Search orders..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
                        </div>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>
                    <div className="rounded-2xl bg-[#111113] border border-white/10 overflow-hidden">
                        <RecentOrder />
                        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
                            <div className="text-sm text-zinc-400">
                                Showing 1-5 of 248 orders
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="px-3 py-1.5 rounded-lg bg-liner-to-r from-[#7C3AED] to-[#8B5CF6]">1</button>
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
