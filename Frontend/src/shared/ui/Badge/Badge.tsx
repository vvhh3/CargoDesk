import type { ReactNode } from "react"

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple"

type BadgeProps = {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "text-zinc-300 bg-white/5 border border-white/10",
  success: "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20",
  warning: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
  error: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
  info: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20",
  purple: "text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20",
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
