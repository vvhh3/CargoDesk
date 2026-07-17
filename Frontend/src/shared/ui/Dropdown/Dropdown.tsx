import { useState, useRef, useEffect, type ReactNode } from "react"

type DropdownItem = {
  label: string
  icon?: ReactNode
  onClick: () => void
  color?: string
}

type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
  align?: "left" | "right"
}

export function Dropdown({ trigger, items, align = "right" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute top-full mt-1 z-20 min-w-44 bg-[#18181B] border border-white/10 rounded-xl shadow-xl py-1 ${
            align === "right" ? "right-0" : "left-0"
          }`}>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-white/5 ${
                item.color || "text-zinc-300 hover:text-white"
              }`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
