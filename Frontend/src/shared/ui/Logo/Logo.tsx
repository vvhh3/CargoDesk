import { Link } from "react-router-dom"
import { Package } from "lucide-react"
import { useSettingsStore } from "../../../entities/settings/model"

export function Logo() {
  const title = useSettingsStore((s) => s.title)

  return (
    <div className="flex gap-3 items-center">
      <div className="flex justify-center items-center rounded-xl w-10 h-10 bg-linear-to-br from-[#7C3AED] to-[#3B82F6]">
        <Link to="/">
          <Package className="text-2xl text-white" />
        </Link>
      </div>
      <h1 className="text-white text-2xl">{title}</h1>
    </div>
  )
}
