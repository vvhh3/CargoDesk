import { useMemo } from "react"

export function useFilter<T>(
  data: T[],
  search: string,
  fields: (keyof T)[]
): T[] {
  return useMemo(() => {
    if (!search.trim()) return data
    const query = search.toLowerCase()
    return data.filter((item) =>
      fields.some((field) => {
        const val = item[field]
        return String(val ?? "").toLowerCase().includes(query)
      })
    )
  }, [data, search, fields])
}
