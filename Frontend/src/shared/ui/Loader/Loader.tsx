type LoaderProps = {
  size?: "sm" | "md" | "lg"
  text?: string
}

const sizeStyles = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
}

export function Loader({ size = "lg", text }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg
        className={`animate-spin text-[#7C3AED] ${sizeStyles[size]}`}
        viewBox="0 0 24 24"
        fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {text && <p className="text-sm text-zinc-400">{text}</p>}
    </div>
  )
}
