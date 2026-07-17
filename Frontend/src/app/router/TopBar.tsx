import { Search, Bell, Settings } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

type TopBarProps = {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <div className="h-20 bg-[#111113] backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] transition-all"/>
        </div>

        <button className="relative p-2.5 rounded-xl cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
          <Bell className="w-5 h-5" />
        </button>

        <div className="relative rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
          <ThemeToggle />
        </div>

        <button className="p-2.5 rounded-xl bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
