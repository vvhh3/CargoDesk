const recentOrders = [
    { id: '#ORD-2847', product: 'iPhone 15 Pro Max', status: 'Delivered', date: '2 hours ago', amount: '$1,299', statusColor: 'text-[#22C55E] bg-[#22C55E]/10' },
    { id: '#ORD-2846', product: 'MacBook Pro 16"', status: 'In Transit', date: '5 hours ago', amount: '$2,499', statusColor: 'text-[#3B82F6] bg-[#3B82F6]/10' },
    { id: '#ORD-2845', product: 'AirPods Pro', status: 'Processing', date: '1 day ago', amount: '$249', statusColor: 'text-[#F59E0B] bg-[#F59E0B]/10' },
    { id: '#ORD-2844', product: 'iPad Air', status: 'Delivered', date: '2 days ago', amount: '$599', statusColor: 'text-[#22C55E] bg-[#22C55E]/10' },
    { id: '#ORD-2843', product: 'Apple Watch Series 9', status: 'Cancelled', date: '3 days ago', amount: '$429', statusColor: 'text-[#EF4444] bg-[#EF4444]/10' },
];

export default function RecentOrder() {
    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
                <span className="text-xl">Recent Orders</span>
                <span className="text-sm text-zinc-400">Latest activity</span>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Order ID</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Product</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-400">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-[#7C3AED]">{order.id}</td>
                                <td className="p-4 text-sm text-white">{order.product}</td>
                                <td className="p-4">
                                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${order.statusColor}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-zinc-400">{order.date}</td>
                                <td className="p-4 text-sm font-medium text-right">{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
