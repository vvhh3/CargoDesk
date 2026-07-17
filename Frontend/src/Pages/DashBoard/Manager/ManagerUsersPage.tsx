import { useState } from "react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { UsersTable } from "../../../features/users/components/UsersTable"
import { useUsers } from "../../../features/users"
import { useFilter } from "../../../shared/hooks/useFilter"

export function ManagerUsersPage() {
  const [search, setSearch] = useState("")
  const { users } = useUsers("manager")

  const filtered = useFilter(users, search, ["id", "name", "lastName", "email", "companyName", "role"])

  return (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search clients..." />
      </div>
      <UsersTable users={filtered} />
    </div>
  )
}
