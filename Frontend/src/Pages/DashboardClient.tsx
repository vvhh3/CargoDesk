import { useStoreAuth } from "../Store/AuthStore"

const DashboardClient = () => {

    const user = useStoreAuth((store) => store.user)
    console.log("user", user)


    return (
        <div>
            

        </div>
    )
}

export default DashboardClient