export type UserRole = "client" | "manager" | "admin"

export type User = {
  id: number
  role: UserRole
  name: string
  lastName: string
  email: string
  companyName: string
  avatar: string
  createdAt: Date
  isDeleted: boolean
}

export type Order = {
  id: number
  userId: number
  product: string
  brand: string
  quantity: number
  status: OrderStatus
  whenCamedate: string | null
  price: number | null
  createdAt: Date
}

export type OrderStatus =
  | "waitingManager"
  | "approved"
  | "rejected"
  | "processing"
  | "inTransit"
  | "delivered"
  | "cancelled"

export type Settings = {
  title: string | null
}
