import {useStoreAuth} from "../Store/AuthStore"
import TopBar from "../Components/TopBarDashboard/TopBar"


const Dashboard = () => {
    
    const user = useStoreAuth((store) => store.user)
    console.log("user",user)
    
    
    return(
        <div>
            <TopBar title="DashBoard"/>
            
        </div>
    )
}

export default Dashboard