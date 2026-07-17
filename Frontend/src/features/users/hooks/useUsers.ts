import { useState, useEffect, useCallback } from "react"
import { usersApi } from "../api/users.api"
import type { User } from "../../../shared/types"

export function useUsers(role?: string) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await usersApi.getAll(role)
      setUsers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [role])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, isLoading, refetch: fetchUsers }
}
