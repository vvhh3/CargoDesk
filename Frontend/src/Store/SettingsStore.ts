import { create } from "zustand"
import { persist } from "zustand/middleware"

type Setting = {
    title: string | null
    setTitle: (title: string) => void
}


export const useSetingStore = create<Setting>()(
    persist((set) => ({
        title: "CargoDesk",

        setTitle: (title) => set({
            title
        })
    }),{
        name: "setting-store"
    })
)

