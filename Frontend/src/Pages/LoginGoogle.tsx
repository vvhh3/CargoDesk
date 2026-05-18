import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"

export default function LoginGoogle() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {

        const res = await axios.post(
          "http://localhost:5000/auth/google",
          {
            credential: credentialResponse.credential
          }
        )

        console.log(res.data)
      }}
      onError={() => {
        console.log("Login Failed")
      }}
    />
  )
}