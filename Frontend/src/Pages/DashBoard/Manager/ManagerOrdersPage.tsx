import { useState } from "react"
import { SearchInput } from "../../../shared/ui/SearchInput"
import { OrdersTable } from "../../../features/orders/components/OrdersTable"

export function ManagerOrdersPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search orders..." />
      </div>
      <OrdersTable orders={[]} />
    </div>
  )
}
