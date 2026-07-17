import { api } from "../../../shared/api/axios"
import type { Order } from "../../../shared/types"

type GetOrdersResponse = {
  orders: Order[]
}

export const ordersApi = {
  getClientOrders: () =>
    api.get<GetOrdersResponse>("/client/orders", { withCredentials: true }).then((r) => r.data.orders),

  getManagerOrders: () =>
    api.get<GetOrdersResponse>("/manager/orders", { withCredentials: true }).then((r) => r.data.orders),

  getAdminOrders: () =>
    api.get<GetOrdersResponse>("/manager/request", { withCredentials: true }).then((r) => r.data.orders),

  getManagerRequests: () =>
    api.get<Order[]>("/manager/request", { withCredentials: true }).then((r) => r.data),

  createOrder: (data: {
    link: string
    product: string
    brand: string
    quantity: number
    productImages: string[]
  }) => api.post("/order", data, { withCredentials: true }).then((r) => r.data),

  acceptOrder: (data: { id: number; idOrder: number; whenDate: string | null; price: number | null }) =>
    api.put("/order/accept", data, { withCredentials: true }).then((r) => r.data),

  rejectOrder: (data: { id: number; idOrder: number }) =>
    api.put("/order/rejest", data, { withCredentials: true }).then((r) => r.data),
}
