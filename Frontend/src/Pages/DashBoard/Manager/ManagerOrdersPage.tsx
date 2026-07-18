import { useState } from "react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { OrdersTable } from "../../../features/orders/components/OrdersTable"

import { ordersApi } from "../../../features/orders"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Loader } from "../../../shared/ui/Loader"
import { useFilter } from "../../../shared/hooks/useFilter"

export function ManagerOrdersPage() {
  const [search, setSearch] = useState("")

  const { data, isError, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: ordersApi.getManagerOrders,
    staleTime: 5000,
    retry: 2
  })

  const dataFilter = useFilter(data!, search, ['id', 'product', 'brand', 'status', 'price'])
  if (isError) toast.error("Ошибка загрузки заказов")
  if (isLoading) return <Loader size="lg" text="Loader...." />


  return (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search orders..." />
      </div>
      <OrdersTable orders={dataFilter} />
    </div>
  )
}
