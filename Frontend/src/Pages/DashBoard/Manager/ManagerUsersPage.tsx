import { useState } from "react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { UsersTable } from "../../../features/users/components/UsersTable"

export function ManagerUsersPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search clients..." />
      </div>
      <UsersTable users={[]} />
    </div>
  )
}
