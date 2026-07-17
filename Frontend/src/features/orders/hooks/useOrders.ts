import { useState, useEffect, useCallback } from "react"
import { ordersApi } from "../api/orders.api"
import { useAuthStore } from "../../../entities/user"
import type { Order } from "../../../shared/types"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuthStore((store) => store.user)

  const fetchOrders = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      let data: Order[]
      if (user.role === "manager") {
        data = await ordersApi.getManagerOrders()
      } else if (user.role === "admin") {
        data = await ordersApi.getAdminOrders()
      } else {
        data = await ordersApi.getClientOrders()
      }
      setOrders(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, isLoading, refetch: fetchOrders }
}
