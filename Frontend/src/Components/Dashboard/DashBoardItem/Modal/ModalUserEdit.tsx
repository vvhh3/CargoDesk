import toast from "react-hot-toast"
import { usersApi } from "../../../../features/users"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../shared/ui/Input"

interface UserType {
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

const formShema = z.object({
    name: z.string().trim().min(2, 'Имя обязательно'),
    lastName: z.string().trim().min(2, "Фамилия обязательна"),
    email: z.string().trim().min(2, "Почта обязательна").email("Не верный формат email"),
    companyName: z.string().trim().min(2, "Название комании обязательно")
})


type formType = z.infer<typeof formShema>


export default function ModalUserEdit({ user, onSelectedUser }: ModalUserProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        reset
    } = useForm<formType>({
        resolver: zodResolver(formShema),
        defaultValues: { name: "", lastName: "", email: "", companyName: "" },
        mode: "onBlur"
    })


    const EditUser = async (data: formType) => {
        if (!data) {
            toast.error("there should not be an empty line")
            return
        }
        try {
            const res = await usersApi.edit({ id: user!.id, ...data })
            console.log("res", res)
            toast.success(res.data.message)
            reset()
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return (
        <div >
            {user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#1a1a2e] border border-white/10 shadow-2xl">

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-5">
                                <h2 className="text-white ">
                                    {user.name} {user.lastName}
                                </h2>
                                <span className="text-white">Id {user.id}</span>
                            </div>
                            <button onClick={() => onSelectedUser(null)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                ✕
                            </button>
                        </div>

                        <form className="space-y-3"
                            onSubmit={handleSubmit( EditUser)}>
                            <div>
                                {/* <label className="text-xs text-gray-500 mb-1 block">Email</label> */}
                                {errors.form?.message && <p>{errors.email?.message}</p>}
                                <Input {...register("email")}
                                // label="Email"
                                    error={errors.email?.message}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Name</label>
                                <Input {...register("name")}
                                    error={errors.name?.message}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">LastName</label>
                                <Input {...register("lastName")}
                                    error={errors.lastName?.message}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">CompanyName</label>
                                <Input {...register("companyName")}
                                    error={errors.companyName?.message}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Role</label>
                                    <input defaultValue={user.role}
                                        readOnly
                                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-purple-300 placeholder:text-gray-600 focus:outline-none focus:border-purple-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">CreatedAt</label>
                                    <input readOnly
                                        defaultValue={new Date(user.createdAt).toLocaleDateString("ru-RU")}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-gray-400 focus:outline-none cursor-default" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">isDelete</label>
                                <input readOnly
                                    defaultValue={user.isDeleted ? "Yes" : "No"}
                                    className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none cursor-default ${user.isDeleted ? "text-red-400" : "text-emerald-400"}`} />
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button onClick={() => onSelectedUser(null)}
                                    className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                    Close
                                </button>
                                <button className="flex-1 py-2.5 rounded-xl text-sm  text-white bg-linear-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity cursor-pointer"
                                    disabled={isSubmitted}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
