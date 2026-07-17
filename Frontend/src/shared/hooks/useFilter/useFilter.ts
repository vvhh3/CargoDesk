import { useMemo } from "react"


export const useFilter  = <T> (
    data: T[], // обьекты
    search: string,
    fields: (keyof T)[] // поля
) => {
    return useMemo(() => {
        if(!search.trim()) return data
        const query = search.toLowerCase()
        return data.filter(item => {
            fields.some(fieId => {
                const val = item[fieId]
                return String(val ?? '').toLowerCase().includes(query)
            })
        })
    },[data,search,fields])
}