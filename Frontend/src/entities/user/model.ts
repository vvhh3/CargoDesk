import { create } from "zustand"
import type { User } from "../../shared/types"

type AuthStore = {
  user: User | null
  setUser: (value: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),
}))
