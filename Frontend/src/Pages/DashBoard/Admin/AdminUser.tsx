
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

const USERS = [
    { id: "U001", name: "Alexei Petrov", email: "a.petrov@example.com", role: "Admin", status: "Active", orders: 0, joined: "Jan 2024", avatar: "AP" },
    { id: "U002", name: "Maria Ivanova", email: "m.ivanova@example.com", role: "Manager", status: "Active", orders: 47, joined: "Feb 2024", avatar: "MI" },
    { id: "U003", name: "John Smith", email: "j.smith@example.com", role: "Client", status: "Active", orders: 12, joined: "Mar 2024", avatar: "JS" },
    { id: "U004", name: "Li Wei", email: "l.wei@example.com", role: "Client", status: "Active", orders: 8, joined: "Mar 2024", avatar: "LW" },
    { id: "U005", name: "Omar Hassan", email: "o.hassan@example.com", role: "Manager", status: "Suspended", orders: 31, joined: "Apr 2024", avatar: "OH" },
    { id: "U006", name: "Sofia Müller", email: "s.muller@example.com", role: "Client", status: "Active", orders: 5, joined: "Apr 2024", avatar: "SM" },
    { id: "U007", name: "Priya Sharma", email: "p.sharma@example.com", role: "Client", status: "Pending", orders: 0, joined: "May 2024", avatar: "PS" },
    { id: "U008", name: "Carlos Ruiz", email: "c.ruiz@example.com", role: "Client", status: "Active", orders: 22, joined: "May 2024", avatar: "CR" },
    { id: "U009", name: "Nina Kozlova", email: "n.kozlova@example.com", role: "Manager", status: "Active", orders: 18, joined: "Jun 2024", avatar: "NK" },
    { id: "U010", name: "David Kim", email: "d.kim@example.com", role: "Client", status: "Suspended", orders: 3, joined: "Jun 2024", avatar: "DK" },
];
const stats = {
    total: USERS.length,
    active: USERS.filter((u) => u.status === "Active").length,
    admins: USERS.filter((u) => u.role === "Admin").length,
    pending: USERS.filter((u) => u.status === "Pending").length,
};

type UserType = {
    id: number
    role: string
    name: string
    lastName: string
    email: string
    companyName: string
    avatar: string
    isDeleted: boolean
}

export default function AdminUser() {

    const [openMenu, setOpenMenu] = useState<number | null>()
    const [users, setUsers] = useState<UserType[]>([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/users", { withCredentials: true })
            setUsers(res.data)
        } catch (e) {
            toast.error("ошибка получения пользоватлей")
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className='p-10'>

            <div className="flex w-full justify-between text-white">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Users</h1>
                    <span className="text-zinc-400">Manage accounts, roles, and access.</span>
                </div>
                <div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] rounded-xl text-sm text-white hover:opacity-90 transition-opacity">
                        Add User
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-10">
                {[
                    { label: "Total Users", value: stats.total, icon: Users, color: "text-zinc-300", bg: "bg-white/5" },
                    { label: "Active", value: stats.active, icon: UserCheck, color: "text-green-400", bg: "bg-green-500/10" },
                    { label: "Admins", value: stats.admins, icon: Crown, color: "text-purple-400", bg: "bg-purple-500/10" },
                    { label: "Pending", value: stats.pending, icon: UserPlus, color: "text-yellow-400", bg: "bg-yellow-500/10" },
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
                    <input placeholder="Search users..." className="px-10 py-2 w-full text-white bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-zinc-400" />
                </div>
                <button className="w-35 rounded-2xl bg-white/5 border  border-white/10 cursor-pointer flex justify-center items-center py-2 text-white gap-3 hover:bg-white/10">
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
                        {users.map((user) => (
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
                                    <span className={`text-xs px-2.5 py-1 rounded-full border ${
                                        user.role === "admin" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
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
                                    <span className={`text-xs px-2.5 py-1 rounded-full border ${
                                        user.isDeleted
                                            ? "text-red-400 bg-red-500/10 border-red-500/20"
                                            : "text-green-400 bg-green-500/10 border-green-500/20"
                                    }`}>
                                        {user.isDeleted ? "true" : "false"}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5 relative">
                                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                                        className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                    {openMenu === user.id && (
                                        <div className="absolute right-4 top-10 z-20 bg-[#18181B] border border-white/10 rounded-xl shadow-xl py-1 w-44">
                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <Pencil className="w-4 h-4" /> Edit Profile
                                            </button>
                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <ChevronDown className="w-4 h-4" /> Change Role
                                            </button>
                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <Mail className="w-4 h-4" /> Send Email
                                            </button>
                                            <div className="border-t border-white/5 my-1" />
                                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                                <Trash2 className="w-4 h-4" /> Delete User
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
