import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ordersApi } from "../api/orders.api"
import { useAuthStore } from "../../../entities/user"
import type { Order } from "../../../shared/types"

type OrderDetailModalProps = {
  selectedOrder: Order | null
  setSelectedOrder: (order: Order | null) => void
}

export function OrderDetailModal({ selectedOrder, setSelectedOrder }: OrderDetailModalProps) {
  
  const [acceptDate, setAcceptDate] = useState({
    whenDate: selectedOrder?.whenCamedate ?? null,
    price: selectedOrder?.price ?? null,
  })

  const user = useAuthStore((store) => store.user)

  const handleAccept = async (idOrder: number) => {
    try {
      const res = await ordersApi.acceptOrder({
        id: user!.id,
        idOrder,
        whenDate: acceptDate.whenDate,
        price: acceptDate.price,
      })
      toast.success(res.message)
      setSelectedOrder(null)
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error")
    }
  }

  const handleReject = async (idOrder: number) => {
    try {
      const res = await ordersApi.rejectOrder({ id: user!.id, idOrder })
      toast.success(res.message)
      setSelectedOrder(null)
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error")
    }
  }

  // useEffect(() => {
  //   setAcceptDate({
  //     whenDate: selectedOrder?.whenCamedate,
  //     price: selectedOrder?.price,
  //   })
  // }, [selectedOrder])

  if (!selectedOrder) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => setSelectedOrder(null)}
    >
      <div
        className="bg-white rounded-2xl p-6 w-150 border border-white/10 text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Order {selectedOrder.id}</h2>

        <div className="space-y-3">
          <p>
            <strong>UserId:</strong> {selectedOrder.userId}
          </p>
          <p>
            <strong>Product:</strong> {selectedOrder.product}
          </p>
          <p>
            <strong>Brand:</strong> {selectedOrder.brand}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedOrder.quantity}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <p>
            <strong>Price:</strong> {selectedOrder.price ?? "—"}
          </p>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Price</label>
            <input
              value={acceptDate.price ?? 0}
              type="number"
              onChange={(e) =>
                setAcceptDate({ ...acceptDate, price: Number(e.target.value) })
              }
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Date</label>
            <input
              value={acceptDate.whenDate ?? ""}
              type="date"
              onChange={(e) =>
                setAcceptDate({ ...acceptDate, whenDate: e.target.value })
              }
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedOrder.createdAt).toLocaleDateString("ru-RU")}
          </p>
        </div>

        <div className="flex w-full justify-between mt-6">
          <div className="flex gap-5">
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white cursor-pointer"
              onClick={() => handleAccept(selectedOrder.id)}
            >
              Подтвердить
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer"
              onClick={() => handleReject(selectedOrder.id)}
            >
              Отклонить
            </button>
          </div>
          <button
            onClick={() => setSelectedOrder(null)}
            className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
