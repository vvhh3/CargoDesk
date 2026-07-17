import { useState } from "react"
import { DataTable } from "../../../shared/ui/Table"
import { Badge } from "../../../shared/ui/Badge"
import type { Order, OrderStatus } from "../../../shared/types"

const statusConfig: Record<OrderStatus, { label: string; variant: "warning" | "success" | "error" | "info" | "purple" }> = {
  waitingManager: { label: "Waiting", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
  processing: { label: "Processing", variant: "info" },
  inTransit: { label: "In Transit", variant: "purple" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "error" },
}

type OrdersTableProps = {
  orders: Order[]
  onOrderLoader?: (orders: Order[]) => void
}

export function OrdersTable({ orders, onOrderLoader }: OrdersTableProps) {
  useState(() => {
    onOrderLoader?.(orders)
  })

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (order: Order) => (
        <span className="font-medium text-[#7C3AED]">{order.id}</span>
      ),
    },
    {
      key: "product",
      header: "Product",
      render: (order: Order) => <span>{order.product}</span>,
    },
    {
      key: "brand",
      header: "Brand",
      render: (order: Order) => <span className="text-zinc-300">{order.brand}</span>,
    },
    {
      key: "quantity",
      header: "Qty",
      render: (order: Order) => <span className="text-zinc-300">{order.quantity}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => {
        const config = statusConfig[order.status] || { label: order.status, variant: "default" as const }
        return <Badge variant={config.variant}>{config.label}</Badge>
      },
    },
    {
      key: "date",
      header: "Date",
      render: (order: Order) => (
        <span className="text-zinc-400">
          {order.whenCamedate ? new Date(order.whenCamedate).toLocaleDateString("ru-RU") : "—"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "text-right",
      render: (order: Order) => (
        <span className="font-medium text-right">{order.price ? `${order.price}₽` : "-"}</span>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={orders}
      keyExtractor={(o) => o.id}
    />
  )
}
