import {create} from "zustand"

type AuthStore = {
    user: any| null
    setUser: (value: any) => void
    logout: () => void
}

export const useStoreAuth = create<AuthStore>((set) => ({
    user: null,

    setUser: (user) => set({
        user,
    }),

    logout:() => set({
        user: null,
    }),

}))