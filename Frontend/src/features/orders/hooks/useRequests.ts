import { useState, useEffect, useCallback } from "react"
import { ordersApi } from "../api/orders.api"
import type { Order } from "../../../shared/types"

export function useRequests() {
  const [requests, setRequests] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRequests = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await ordersApi.getManagerRequests()
      setRequests(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  return { requests, isLoading, refetch: fetchRequests }
}
