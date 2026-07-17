import { api } from "../../../shared/api/axios"
import type { User } from "../../../shared/types"

type LoginParams = {
  email: string
  password: string
}

type RegisterParams = {
  name: string
  lastName: string
  email: string
  companyName: string
  password: string
}

type AuthResponse = {
  user: User
  message: string
}

export const authApi = {
  login: (data: LoginParams) => api.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterParams) =>
    api.post<AuthResponse>("/auth/register", data).then((r) => r.data),

  logout: () =>
    api.post<{ message: string }>("/logout", {}).then((r) => r.data),

  me: () =>api.get<{ user: User }>("/auth/me").then((r) => r.data.user),

  googleAuth: (credential: string) =>
    api.post<AuthResponse>("/auth/google", { credential }).then((r) => r.data),
}
