import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useStoreAuth } from "../../Store/AuthStore"

export default function AuthGoogle() {
    const navigate = useNavigate()
    const setUser = useStoreAuth(store => store.setUser)

    return (
        <GoogleLogin
            text="signin_with"
            shape="rectangular"
            size="large"
            onSuccess={async (credentialResponse) => {
                const res = await axios.post(
                    "http://localhost:5000/auth/google",
                    {
                        credential: credentialResponse.credential
                    },
                    {
                        withCredentials: true
                    }
                )

                navigate(`/dashboard/${res.data.user.role}`)
                setUser(res.data.user)
                console.log(res.data)
            }}
            onError={() => {
                console.log("Login Failed")
            }}
        />
    )
}