
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

type ModalUserProps = {
    user: UserType | null
    onSelectedUser: (user: UserType | null) => void
}

export default function ModalUserEdit({ user, onSelectedUser }: ModalUserProps) {

    return (
        <div >
            {user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#1a1a2e] border border-white/10 shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-5">
                                <h2 className="text-white ">
                                    {user.name} {user.lastName}
                                </h2>
                                <span className=" text-white">Id {user.id}</span>
                            </div>
                            <button
                                onClick={() => onSelectedUser(null)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                                <input defaultValue={user.email}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Name</label>
                                <input defaultValue={user.name}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">LastName</label>
                                <input defaultValue={user.lastName}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">CompanyName</label>
                                <input defaultValue={user.companyName}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Role</label>
                                    <input defaultValue={user.role}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-purple-300 placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">CreatedAt</label>
                                    <input readOnly
                                        defaultValue={new Date(user.createdAt).toLocaleDateString("ru-RU")}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-gray-400 focus:outline-none cursor-default"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">isDelete</label>
                                <input readOnly
                                    defaultValue={user.isDeleted ? "Yes" : "No"}
                                    className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none cursor-default ${user.isDeleted ? "text-red-400" : "text-emerald-400"}`} />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button onClick={() => onSelectedUser(null)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                Close
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
