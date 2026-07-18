import { useMemo } from "react"


export const useFilter = <T> (
    data: T[], // массив обьектов
    search: string,
    fields: (keyof T)[] // поля по которым будем проводить поиск
) => {
    return useMemo(() => {
        if(!search.trim()) return data
        const query = search.toLowerCase()    // query - запрос
        return data.filter(item => { // возращаем отфильтрованные данные 
        return fields.some(fieId => { // проверка на совпадает ли хотя бы один элемент условию (проходимся по всем полям которые передали )
                const val = item[fieId]
                return String(val ?? '').toLowerCase().includes(query)
            })
        })
    },[data,search,fields])
}