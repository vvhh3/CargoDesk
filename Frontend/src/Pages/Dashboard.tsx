import {useStoreAuth} from "../Store/AuthStore"
import TopBar from "../Components/TopBarDashboard/TopBar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Dashboard = () => {
    
    const navigate = useNavigate()
    const user = useStoreAuth((store) => store.user)
    console.log("user",user)
    
    useEffect(() => {
        if(!user){
            navigate("/login")
        }
    },[])
    
    return(
        <div>
            <TopBar title="DashBoard"/>
            
        </div>
    )
}

export default Dashboard