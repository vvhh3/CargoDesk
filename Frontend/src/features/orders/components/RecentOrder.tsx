import { useEffect, useState } from "react";
import { useAuthStore } from "../../../entities/user";
import { api } from "../../../shared/api/axios";

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

const statusConfig: Record<string, { label: string, color: string }> = {
    waitingManager: { label: "Waiting", color: "text-[#F59E0B] bg-[#F59E0B]/10" },
    approved: { label: "Approved", color: "text-[#22C55E] bg-[#22C55E]/10" },
    rejected: { label: "Rejected", color: "text-[#EF4444] bg-[#EF4444]/10" },
    processing: { label: "Processing", color: "text-[#3B82F6] bg-[#3B82F6]/10" },
    inTransit: { label: "In Transit", color: "text-[#A78BFA] bg-[#A78BFA]/10" },
    delivered: { label: "Delivered", color: "text-[#22C55E] bg-[#22C55E]/10" },
    cancelled: { label: "Cancelled", color: "text-[#EF4444] bg-[#EF4444]/10" },
}

type PropsOrder = {
    search?: string | undefined
    onOrderLoader?: (orders: Order[]) => void
}

export function RecentOrder({ search, onOrderLoader }: PropsOrder) {

    const [orders, setOrders] = useState<Order[]>([])
    const user = useAuthStore(store => store.user)

    const getOrder = async () => {
        try {
            if(!user) return
            const endpoint = user.role === "manager"
                ? "/manager/orders"
                : user.role === "admin"
                    ? "/manager/request"
                    : "/client/orders"
            const res = await api.get<{ orders: Order[] }>(endpoint, { withCredentials: true })
            setOrders(res.data.orders)

            onOrderLoader?.(res.data.orders)
        } catch (e) {
            console.log(e)
        }
    }

    const filtered = orders.filter(order => {
        const searchLower = search?.toLowerCase() || ''

        return order.id.toString().includes(searchLower) ||
            order.product.toLowerCase().includes(searchLower) ||
            order.brand.toString().toLowerCase().includes(searchLower) ||
            order.quantity.toString().includes(searchLower) ||
            order.status.toString().toLowerCase().includes(searchLower) ||
            order.whenCamedate?.toString().toLowerCase().includes(searchLower) ||
            order.price?.toString().includes(searchLower)
    })

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className="w-full rounded-t-2xl border border-white/10 bg-white/5 p-5 text-white">
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
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Brand</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Qty</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">Date</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-400">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((order, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-[#7C3AED]">{order.id}</td>
                                <td className="p-4 text-sm text-white">{order.product}</td>
                                <td className="p-4 text-sm text-zinc-300">{order.brand}</td>
                                <td className="p-4 text-sm text-zinc-300">{order.quantity}</td>
                                <td className="p-4">
                                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${statusConfig[order.status].color}`}>
                                        {statusConfig[order.status].label}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-zinc-400">{ order.whenCamedate ? new Date(order.whenCamedate).toLocaleDateString("ru-RU") : "—" }</td>
                                <td className="p-4 text-sm font-medium text-right">{order.price ? order.price : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
