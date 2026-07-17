import { api } from "../../../shared/api/axios"
import type { User } from "../../../shared/types"

export const usersApi = {
  getAll: (role?: string) => {
    const endpoint = role === "manager" ? "/manager/users" : "/admin/users"
    return api.get<User[]>(endpoint, { withCredentials: true }).then((r) => r.data)
  },

  edit: (data: { id: number; name: string; lastName: string; email: string; companyName: string }) =>
    api.put("/users/edit", data, { withCredentials: true }).then((r) => r.data),

  changeRole: (data: { id: number; role: string }) =>
    api.patch("/users/role", data, { withCredentials: true }).then((r) => r.data),

  delete: (data: { id: number; isDeleted: boolean }) =>
    api.patch("/users/delete", data, { withCredentials: true }).then((r) => r.data),
}
