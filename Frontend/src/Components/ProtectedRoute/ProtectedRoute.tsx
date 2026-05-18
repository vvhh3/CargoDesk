import type React from "react"
import { useStoreAuth } from "../../Store/AuthStore"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const isAuth = useStoreAuth(store => store.isAuth)
    const isLoading = useStoreAuth(store => store.isLoading)

    if(isLoading){
        return <div className="text-white">Loading...</div>
    }
    if(!isAuth){
        return <Navigate to="/login" replace/>
    }
    return children
}

export default ProtectedRoute