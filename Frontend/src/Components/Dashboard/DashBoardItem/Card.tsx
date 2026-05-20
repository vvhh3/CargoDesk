import type { LucideIcon } from "lucide-react"

type CardProps = {
    icon: LucideIcon
    colorGradien: string
    colorBorder: string
    colorShadow: string
    value: string
    title: string
}

export default function Card({icon:Icon ,colorGradien, colorBorder,colorShadow, value, title}: CardProps) {
    return (
        <div className={`flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-${colorBorder} p-6
                hover:scale-102 shadow-lg duration-500 hover:shadow-${colorShadow}`}>
            <div className="flex justify-between w-full">
                <div className={`w-12 h-12 flex justify-center items-center bg-linear-to-r ${colorGradien} rounded-xl text-white`}>
                    <Icon className="w-6 h-6" />
                </div>
                {/* <span className="text-green-500">+12.5%</span> */}
            </div>
            <span className="text-3xl text-white font-bold mb-1">{value}</span>
            <span className="text-zinc-400">{title}</span>
        </div>
    )
}
