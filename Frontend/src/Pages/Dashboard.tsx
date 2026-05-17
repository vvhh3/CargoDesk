import {useStoreAuth} from "../Store/AuthStore"

const Dashboard = () => {
    
    const user = useStoreAuth((store) => store.user)
    console.log("user",user)
    return(
        <div>


        </div>
    )
}

export default Dashboard