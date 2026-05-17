import {create} from "zustand"

type AuthStore = {
    user: any| null
    setUser: (value: any) => void
    isAuth: boolean
    logout: () => void
    isLoading: boolean
    setLoading: (value: boolean) => void
}

export const useStoreAuth = create<AuthStore>((set) => ({
    user: null,
    isAuth: false,
    isLoading: true,

    setUser: (user) => set({
        user,
        isAuth: true
    }),

    logout:() => set({
        user: null,
        isAuth: false
    }),

    setLoading: (value) => set({
        isLoading: value
    })
}))