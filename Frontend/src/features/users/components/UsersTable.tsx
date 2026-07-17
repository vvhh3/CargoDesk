import { DataTable } from "../../../shared/ui/Table"
import { Badge } from "../../../shared/ui/Badge"
import type { User } from "../../../shared/types"

type UsersTableProps = {
  users: User[]
  onUserClick?: (user: User) => void
}

export function UsersTable({ users, onUserClick }: UsersTableProps) {
  const columns = [
    {
      key: "id",
      header: "ID",
      render: (user: User) => (
        <span className="font-medium text-[#7C3AED]">{user.id}</span>
      ),
    },
    {
      key: "name",
      header: "User",
      render: (user: User) => (
        <div>
          <div className="text-sm font-medium text-white">
            {user.name} {user.lastName}
          </div>
          <div className="text-xs text-zinc-500">{user.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user: User) => {
        const variant =
          user.role === "admin"
            ? "purple"
            : user.role === "manager"
            ? "info"
            : "success"
        return <Badge variant={variant}>{user.role}</Badge>
      },
    },
    {
      key: "companyName",
      header: "Company",
      render: (user: User) => (
        <span className="text-cyan-400">{user.companyName}</span>
      ),
    },
    {
      key: "isDeleted",
      header: "Status",
      render: (user: User) => (
        <Badge variant={user.isDeleted ? "error" : "success"}>
          {user.isDeleted ? "deleted" : "active"}
        </Badge>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      keyExtractor={(u) => u.id}
      onRowClick={onUserClick}
    />
  )
}
