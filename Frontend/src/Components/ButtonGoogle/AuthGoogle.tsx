import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useStoreAuth } from "../../Store/AuthStore"
import toast from "react-hot-toast"

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
                toast.success(res.data.message)
                setUser(res.data.user)
            }}
            onError={() => {
                toast.error("Login Failed")
            }}
        />
    )
}