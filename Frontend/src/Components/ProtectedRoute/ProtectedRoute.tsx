import type {ReactNode} from "react"
import { useStoreAuth } from "../../Store/AuthStore"
import { Navigate } from "react-router-dom"

type ProtectedType = {
    children: ReactNode
}
// Все, что лежит между открывающим и закрывающим тегом компонента, 
// React передает как children.

const ProtectedRoute = (props: ProtectedType) => {
    const isAuth = useStoreAuth(store => store.isAuth)
    const isLoading = useStoreAuth(store => store.isLoading)

    const children = props.children

    if(isLoading){
        return <div className="text-white">Loading...</div>
    }
    
    if(!isAuth){
        return <Navigate to="/login" replace/>
    }
    return children
}

export default ProtectedRoute