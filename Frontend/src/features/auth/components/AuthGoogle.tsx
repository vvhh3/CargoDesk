import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { authApi } from "../api/auth.api"
import { useAuthStore } from "../../../entities/user"
import toast from "react-hot-toast"

export function AuthGoogle() {
  const navigate = useNavigate()
  const setUser = useAuthStore((store) => store.setUser)

  return (
    <GoogleLogin
      text="signin_with"
      shape="rectangular"
      size="large"
      onSuccess={async (credentialResponse) => {
        const res = await authApi.googleAuth(credentialResponse.credential!)
        navigate(`/dashboard/${res.user.role}`)
        toast.success(res.message)
        setUser(res.user)
      }}
      onError={() => {
        toast.error("Login Failed")
      }}
    />
  )
}
