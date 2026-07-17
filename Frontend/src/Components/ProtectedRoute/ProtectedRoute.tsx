import { useEffect, type ReactNode } from "react"
import { useStoreAuth } from "../../Store/AuthStore"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

type ProtectedType = {
    children: ReactNode
}
// Все, что лежит между открывающим и закрывающим тегом компонента, 
// React передает как children.

const ProtectedRoute = (props: ProtectedType) => {
    const setUser = useStoreAuth((state) => state.setUser)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            console.log("123")
            const res = await axios.get("http://localhost:5000/auth/me", {
                withCredentials: true
            })
            return res.data.user
        },
        staleTime: 5000,
        retry: 2,
    })

    useEffect(() => {
        if (!data) return
        setUser(data)
    }, [data])

    if (isError) return <Navigate to="/login" replace />
    if (isLoading) return <p className="text-red-500">loading.....</p>

    if (!data) {
        return <Navigate to="/login" replace />
    }

    return props.children
}

export default ProtectedRoute