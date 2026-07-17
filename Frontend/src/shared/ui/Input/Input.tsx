import { type InputHTMLAttributes, forwardRef } from "react"
import type { LucideIcon } from "lucide-react"

type InputProps = {
  label?: string
  error?: string
  icon?: LucideIcon
  containerClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && <label className="text-sm text-zinc-300">{label}</label>}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all ${
              Icon ? "pl-12" : "px-4"
            } py-3.5 ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
