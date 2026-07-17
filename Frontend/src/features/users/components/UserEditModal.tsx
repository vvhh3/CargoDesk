import { useState } from "react"
import toast from "react-hot-toast"
import { usersApi } from "../api/users.api"
import type { User } from "../../../shared/types"

type UserEditModalProps = {
  user: User
  onClose: () => void
  onSaved?: () => void
}

export function UserEditModal({ user, onClose, onSaved }: UserEditModalProps) {
  const [form, setForm] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    companyName: user.companyName,
  })

  const handleSave = async () => {
    if (
      !form.name.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.companyName.trim()
    ) {
      toast.error("Fields cannot be empty")
      return
    }

    try {
      await usersApi.edit({
        id: user.id,
        ...form,
      })
      toast.success("User updated")
      onSaved?.()
      onClose()
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#1a1a2e] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            <h2 className="text-white">
              {user.name} {user.lastName}
            </h2>
            <span className="text-white">Id {user.id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">LastName</label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">CompanyName</label>
            <input
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Role</label>
              <input
                defaultValue={user.role}
                readOnly
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-purple-300 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">CreatedAt</label>
              <input
                readOnly
                defaultValue={new Date(user.createdAt).toLocaleDateString("ru-RU")}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-gray-400 focus:outline-none cursor-default"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">isDeleted</label>
            <input
              readOnly
              defaultValue={user.isDeleted ? "Yes" : "No"}
              className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none cursor-default ${
                user.isDeleted ? "text-red-400" : "text-emerald-400"
              }`}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm text-white bg-linear-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
