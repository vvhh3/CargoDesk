import { useState, useEffect } from "react"
import { MoreHorizontal, ChevronDown, Mail, Pencil, Trash2, Download, Users, UserCheck, UserPlus, Crown } from "lucide-react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { Button } from "../../../shared/ui/Button"
import { Dropdown } from "../../../shared/ui/Dropdown"
import { UserEditModal } from "../../../features/users/components/UserEditModal"
import { usersApi } from "../../../features/users/api"
import toast from "react-hot-toast"
import * as XLSX from "xlsx"

type UserType = {
  id: number; role: string; name: string; lastName: string; email: string
  companyName: string; avatar: string; createdAt: Date; isDeleted: boolean
}

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [search, setSearch] = useState("")
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openChangeRole, setOpenChangeRole] = useState(false)
  const [selectUser, setSelectUser] = useState<UserType | null>(null)

  const getUsers = async () => {
    try { setUsers(await usersApi.getAll()) }
    catch { toast.error("Error fetching users") }
  }

  useEffect(() => { getUsers() }, [])

  const exportUsers = async () => {
    try {
      const rows = users.map(u => ({
        id: u.id, role: u.role, name: u.name, lastName: u.lastName, email: u.email,
        companyName: u.companyName, isDeleted: u.isDeleted,
        createdAt: new Date(u.createdAt).toLocaleDateString("ru-RU")
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Users")
      ws["!cols"] = [{ wch: 6 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 15 }]
      XLSX.writeFile(wb, "Users.xlsx")
      toast.success("Success")
    } catch { toast.error("Error exporting users") }
  }

  const changeRole = async (id: number,role: string) => {
    try {
      await usersApi.changeRole({ id: id, role })
      
      setOpenChangeRole(false); setOpenMenu(null)
      toast.success("Role updated")
      getUsers()
    } catch (e: any) { toast.error(e.response?.data?.message || "Error") }
  }
  
  const deleteUser = async (id: number, del: boolean) => {
    try {
      console.log(id)
      await usersApi.delete({ id: id, isDeleted: del })
      setOpenMenu(null); toast.success("User updated")
      getUsers()
    } catch (e: any) { toast.error(e.response?.data?.message || "Error") }
  }

  const filteredUsers = users.filter(u => {
    const s = search.toLowerCase()
    return u.id.toString().includes(s) || u.role.toLowerCase().includes(s) || u.name.toLowerCase().includes(s) ||
      u.lastName.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.companyName.toLowerCase().includes(s)
  })

  return (
    <div className="p-10">
      <div className="flex w-full justify-between text-white">
        <div className="flex flex-col">
          <h1 className="text-2xl">Users</h1>
          <span className="text-zinc-400">Manage accounts, roles, and access.</span>
        </div>
        <Button>Add User</Button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-10">
        {[
          { label: "Total Users", value: users.length, icon: Users, color: "text-zinc-300", bg: "bg-white/5" },
          { label: "Active", value: 4, icon: UserCheck, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Admins", value: 1, icon: Crown, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Pending", value: 2, icon: UserPlus, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 justify-between w-full mt-10">
        <SearchInput value={search} onChange={setSearch} placeholder="Search users..." />
        <Button variant="secondary" onClick={exportUsers}><Download className="w-3.5 h-3.5" />Export</Button>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-2xl mt-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["Id", "User", "Role", "companyName", "isDeleted", ""].map(h => (
                <th key={h} className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3.5">
                  <span className="text-xs px-2.5 py-1 rounded-full border text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20">{user.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div>
                    <div className="text-sm font-medium text-white">{user.name} {user.lastName}</div>
                    <div className="text-xs text-zinc-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    user.role === "admin" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
                    user.role === "manager" ? "text-blue-400 bg-blue-500/10 border-blue-500/20" :
                    "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs px-2.5 py-1 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">{user.companyName}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${user.isDeleted ? "text-red-400 bg-red-500/10 border-red-500/20" : "text-green-400 bg-green-500/10 border-green-500/20"}`}>
                    {user.isDeleted ? "true" : "false"}
                  </span>
                </td>
                <td className="px-4 py-3.5 relative">
                  <Dropdown
                    trigger={<button className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5"><MoreHorizontal className="w-4 h-4" /></button>}
                    items={[
                      { label: "Edit Profile", icon: <Pencil className="w-4 h-4" />, onClick: () => { setSelectUser(user); setOpenMenu(null) } },
                      { label: "Change Role", icon: <ChevronDown className="w-4 h-4" />, onClick: () => setOpenChangeRole(!openChangeRole) },
                      ...(openChangeRole ? [
                        { label: "client", onClick: () => changeRole(user.id, "client") },
                        { label: "manager", onClick: () => changeRole(user.id, "manager") },
                        { label: "admin", onClick: () => changeRole(user.id, "admin") },
                      ] : []),
                      { label: "Send Email", icon: <Mail className="w-4 h-4" />, onClick: () => {} },
                      { label: user.isDeleted ? "UnBan User" : "Delete User", icon: <Trash2 className="w-4 h-4" />, onClick: () => deleteUser(user.id, user.isDeleted ? false : true), color: user.isDeleted ? "text-green-400" : "text-red-400" },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectUser && <UserEditModal user={selectUser} onSelectedUser={() => setSelectUser(null)} />}
    </div>
  )
}
