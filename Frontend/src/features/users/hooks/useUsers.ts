import { usersApi } from "../api/users.api"
import { useQuery } from "@tanstack/react-query"

export function useUsers(role?: string) {

  return useQuery({
    queryKey: ["user",role],
    queryFn: () => usersApi.getAll(role)
  })
}
