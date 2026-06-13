
import axios from "axios";
import {
    Search,
    MoreHorizontal,
    ChevronDown,
    Mail,
    UserCheck,
    Pencil,
    Trash2,
    Download,
    Users,
    UserPlus,
    Crown,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import ModalUserEdit from "../../../Components/Dashboard/DashBoardItem/Modal/ModalUserEdit";

type UserType = {
    id: number
    role: string
    name: string
    lastName: string
    email: string
    companyName: string
    avatar: string
    createdAt: Date
    isDeleted: boolean
}

export default function AdminUser() {

    const [openMenu, setOpenMenu] = useState<number | null>()
    const [openChangeRole, setOpenChangeRole] = useState(false)

    const [users, setUsers] = useState<UserType[]>([])
    const [search, setSearch] = useState("")

    const [selectUser,setSelectUser] = useState<UserType | null>(null)

    const getAllUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/users", { withCredentials: true })
            setUsers(res.data)
        } catch (e) {
            toast.error("ошибка получения пользоватлей")
        }
    }

    const ExportUsers = async () => {
        try {
            const rows = users.map(user => ({
                "id": user.id,
                "role": user.role,
                "name": user.name,
                "lastName": user.lastName,
                "email": user.email,
                "companyName": user.companyName,
                "isDeleted": user.isDeleted,
                "createdAt": new Date(user.createdAt).toLocaleDateString("ru-RU")
            }))

            // данные в лсит exel
            const worksheet = XLSX.utils.json_to_sheet(rows)

            const book = XLSX.utils.book_new()

            XLSX.utils.book_append_sheet(book, worksheet, "Users")

            worksheet["!cols"] = [
                { wch: 6 }, { wch: 25 }, { wch: 25 },
                { wch: 30 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 15 }
            ]

            XLSX.writeFile(book, "Orders.xlsx")
            toast.success("Succees")
        } catch (e) {
            toast.error("error export users, try again later")
            console.log(e)
        }
    }

    const ChangeRole = async (changeRole: string) => {
        try {
            const res = await axios.patch("http://localhost:5000/users/role", {
                id: openMenu,
                role: changeRole
            }, {
                withCredentials: true
            })
            setOpenMenu(null)
            toast.success(res.data.message)
        } catch (e: any) {
            toast.error(e.response.data.message || "error")
        }
    }

    const DeleteUser = async (del: boolean) => {
        try {
            const res = await axios.patch("http://localhost:5000/users/delete", {
                id: openMenu,
                isDeleted: del
            }, {
                withCredentials: true
            })
            setOpenMenu(null)
            toast.success(res.data || "1")
        } catch (e: any) {
            toast.error(e.response.data.message || "error")
        }
    }

    const filteredUsers = users.filter((u) => {
        const s = search.toLowerCase()
        return u.id.toString().includes(s) ||
            u.role.toLowerCase().includes(s) ||
            u.name.toLowerCase().includes(s) ||
            u.lastName.toLowerCase().includes(s) ||
            u.email.toLowerCase().includes(s) ||
            u.companyName.toLowerCase().includes(s)
    })

    useEffect(() => {
        getAllUsers()
    }, [ChangeRole,DeleteUser])

    return (
        <div className='p-10'>

            <div className="flex w-full justify-between text-white">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Users</h1>
                    <span className="text-zinc-400">Manage accounts, roles, and access.</span>
                </div>
                <div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] rounded-xl text-sm text-white hover:opacity-90  cursor-pointer">
                        Add User
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-10">
                {[
                    { label: "Total Users", value: users.length, icon: Users, color: "text-zinc-300", bg: "bg-white/5" },
                    { label: "Active", value: 4, icon: UserCheck, color: "text-green-400", bg: "bg-green-500/10" },
                    { label: "Admins", value: 1, icon: Crown, color: "text-purple-400", bg: "bg-purple-500/10" },
                    { label: "Pending", value: 2, icon: UserPlus, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                ].map((s) => (
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

                <div className="relative w-full flex items-center">
                    <Search className="absolute left-3 w-5 h-5 text-zinc-400" />
                    <input placeholder="Search users..." className="px-10 py-2 w-full text-white bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-zinc-400"
                        onChange={(e) => setSearch(e.target.value)} />
                </div>

                <button className="w-35 rounded-2xl bg-white/5 border  border-white/10 cursor-pointer flex justify-center items-center py-2 text-white gap-3 hover:bg-white/10"
                    onClick={ExportUsers}>
                    <Download className="w-3.5 h-3.5" />
                    Export
                </button>
            </div>

            <div className="bg-white/3 border border-white/8 rounded-2xl mt-10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/8">
                            <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">
                                Id
                            </th>
                            <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">
                                User
                            </th>
                            <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">
                                companyName
                            </th>
                            <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 uppercase tracking-wider">
                                isDeleted
                            </th>
                            <th className="w-10 px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}
                                className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors`}>

                                <td className="px-4 py-3.5">
                                    <span className="text-xs px-2.5 py-1 rounded-full border text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20">
                                        {user.id}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-sm font-medium text-white">{user.name} {user.lastName}</div>
                                            <div className="text-xs text-zinc-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3.5">
                                    <span className={`text-xs px-2.5 py-1 rounded-full border ${user.role === "admin" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
                                        user.role === "manager" ? "text-blue-400 bg-blue-500/10 border-blue-500/20" :
                                            "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5">
                                    <span className="text-xs px-2.5 py-1 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                                        {user.companyName}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5">
                                    <span className={`text-xs px-2.5 py-1 rounded-full border ${user.isDeleted
                                        ? "text-red-400 bg-red-500/10 border-red-500/20"
                                        : "text-green-400 bg-green-500/10 border-green-500/20"
                                        }`}>
                                        {user.isDeleted ? "true" : "false"}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5 relative">
                                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                                        className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 ">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                    {openMenu === user.id && (
                                        <div className="absolute right-4 top-10 z-20 bg-[#18181B] border border-white/10 rounded-xl shadow-xl py-1 w-44">
                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white "
                                            onClick={() => setSelectUser(user)}>
                                                <Pencil className="w-4 h-4" /> Edit Profile
                                            </button>


                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white "
                                                onClick={() => setOpenChangeRole(openChangeRole ? false : true)}>
                                                <ChevronDown className="w-4 h-4" /> Change Role
                                            </button>

                                            {openChangeRole ? <>
                                                <button onClick={() => ChangeRole("client")}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white ">
                                                    client
                                                </button>
                                                <button onClick={() => ChangeRole("manager")}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white ">
                                                    manager
                                                </button>
                                                <button onClick={() => ChangeRole("admin")}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white ">
                                                    admin
                                                </button>
                                            </> : null}

                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white ">
                                                <Mail className="w-4 h-4" /> Send Email
                                            </button>
                                            <div className="border-t border-white/5 my-1" />

                                            {user.isDeleted ? <>
                                                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-green-400 hover:bg-red-500/10 "
                                                onClick={() => DeleteUser(false)}>
                                                    UnBan User
                                                </button>
                                            </> : <>
                                                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 "
                                                onClick={() => DeleteUser(true)}>
                                                    <Trash2 className="w-4 h-4" /> Delete User
                                                </button>
                                            </>}
                                            
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalUserEdit user={selectUser} onSelectedUser={setSelectUser}/>
        </div>
    )
}
