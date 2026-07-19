import { create } from "zustand"
import { persist } from "zustand/middleware"

type SettingsStore = {
  title: string
  setTitle: (title: string) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist((set) => ({
      title: "CargoDesk",
      setTitle: (title) => set({ title }),
    }),{
      name: "setting-store",
    }
  )
)
