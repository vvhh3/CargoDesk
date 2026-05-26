import { useEffect, useState } from 'react'
import { useStoreAuth } from '../../../../Store/AuthStore'
import axios from 'axios'


type UserType = {
    id: number
    role: string
    name: string
    lastName: string
    email: string
    companyName: string
    isDeleted: boolean
}

export default function TableUser() {

    const [users, setUsers] = useState<UserType[]>([])

    const user = useStoreAuth(store => store.user)

    const getUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/${user.role == "manager" ?
                "manager/users" : "admin/users"}`,
                {
                    withCredentials: true
                })
            setUsers(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
                <span className="text-xl">Table Users</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">User ID</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">role</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">name</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-400">lastName</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-400">email</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-400">companyName</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-400">isDeleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-[#7C3AED]">{user.id}</td>
                                <td className="p-4 text-sm text-white">{user.role}</td>
                                <td className="p-4 text-sm text-zinc-400">{user.name}</td>
                                <td className="p-4 text-sm font-medium text-right">{user.lastName}</td>
                                <td className="p-4 text-sm font-medium text-right">{user.email}</td>
                                <td className="p-4 text-sm font-medium text-right">{user.companyName}</td>
                                <td className="p-4 text-sm font-medium text-right">{user.isDeleted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
