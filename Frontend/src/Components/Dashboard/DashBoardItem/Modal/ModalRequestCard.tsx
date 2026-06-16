import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useStoreAuth } from "../../../../Store/AuthStore"

type RequestOrder = {
    id: number,
    userId: number,
    product: string,
    brand: string,
    quantity: number,
    status: string | any,
    whenCamedate: string | null,
    price: number | null,
    createdAt: Date
}

type ModalRequestCardProps = {
    selectedOrder: RequestOrder | null
    setSelectedOrder: (order: RequestOrder | null) => void
}

export default function ModalRequestCard({ selectedOrder, setSelectedOrder }: ModalRequestCardProps) {

    const [acceptDate, setAcceptDate] = useState({ whenDate: selectedOrder?.whenCamedate, price: selectedOrder?.price })
    const user =  useStoreAuth(store => store.user)

    const AcceptOrder = async (idOrder: number) => {

        try {
            const res = await axios.put("http://localhost:5000/order/accept", {
                id: user.id,
                idOrder: idOrder,
                whenDate: acceptDate.whenDate,
                price: acceptDate.price
            }, {
                withCredentials: true
            })

            toast.success(res.data.message)

        } catch (e: any) {
            toast.error(e.response.data.message)
        }
    }
    return (
        <div>
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-150 border border-white/10 text-black"
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">Order {selectedOrder.id}</h2>

                        <div className="space-y-3 ">
                            <p><strong>UserId:</strong> {selectedOrder.userId}</p>

                            <p><strong>Product:</strong> {selectedOrder.product}</p>

                            <p><strong>Brand:</strong> {selectedOrder.brand}</p>

                            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>

                            <p><strong>Status:</strong> {selectedOrder.status}</p>

                            <p><strong>Price:</strong> {selectedOrder.price ?? "—"}</p>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Price</label>
                                <input value={acceptDate.price ?? 0}
                                    type="number"
                                    onChange={(e) => setAcceptDate({ ...acceptDate, price: Number(e.target.value) })}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Price</label>
                                <input value={acceptDate.whenDate ?? 0}
                                    type="date"
                                    onChange={(e) => setAcceptDate({ ...acceptDate, whenDate: e.target.value })}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-500 " />
                            </div>

                            <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString("ru-RU")}</p>
                        </div>

                        <div className="flex w-full justify-between">

                            <div className="flex gap-5">
                                <button className="mt-6 px-4 py-2 rounded-lg bg-green-500 cursor-pointer"
                                    onClick={() => AcceptOrder(selectedOrder.id)}>
                                    Подтвердить
                                </button>

                                <button className="mt-6 px-4 py-2 rounded-lg bg-red-500 cursor-pointer">
                                    Отклонить
                                </button>
                            </div>

                            <button onClick={() => setSelectedOrder(null)}
                                className="mt-6 px-4 py-2 rounded-lg bg-red-500 cursor-pointer">
                                Close
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
