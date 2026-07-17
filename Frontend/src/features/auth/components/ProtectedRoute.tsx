import { useEffect, type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { authApi } from "../api/auth.api"
import { useAuthStore } from "../../../entities/user"
import { Loader } from "../../../shared/ui/Loader"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const setUser = useAuthStore((state) => state.setUser)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: authApi.me,
    staleTime: 5000,
    retry: 2,
  })

  useEffect(() => {
    if (!data) return
    setUser(data)
  }, [data, setUser])

  if (isError) return <Navigate to="/login" replace />
  if (isLoading) return <Loader size="lg" text="Loading..." />

  if (!data) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
