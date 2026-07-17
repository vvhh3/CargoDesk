import type { ReactNode } from "react"

type Column<T> = {
  key: string
  header: string
  render: (item: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
  onRowClick?: (item: T) => void
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  className = "",
}: DataTableProps<T>) {


  return (
    <div className={`w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left p-4 text-sm font-medium text-zinc-400 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick?.(item)}
              className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}>
              {columns.map((col) => (
                <td key={col.key} className={`p-4 text-sm ${col.className || ""}`}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
