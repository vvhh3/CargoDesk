import type { LucideIcon } from "lucide-react"

type StatCardProps = {
  icon: LucideIcon
  value: string
  title: string
  gradient?: string
  borderColor?: string
  children?: React.ReactNode
}

export function StatCard({
  icon: Icon,
  value,
  title,
  gradient = "from-[#7C3AED] to-[#8B5CF6]",
  children,
}: StatCardProps) {
  return (
    <div className="flex flex-1 flex-col w-auto bg-white/5 items-start rounded-2xl gap-2 border border-white/10 p-6 hover:scale-102 shadow-lg duration-500">
      <div className="flex justify-between w-full">
        <div
          className={`w-12 h-12 flex justify-center items-center bg-linear-to-r ${gradient} rounded-xl text-white`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <span className="text-3xl text-white font-bold mb-1">{value}</span>
      <span className="text-zinc-400">{title}</span>
      {children}
    </div>
  )
}
