
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


    return (
        <div>{selectedOrder && (
            <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                onClick={() => setSelectedOrder(null)}
            >
                <div
                    className="bg-[#111113] rounded-2xl p-6 w-150 border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Order #{selectedOrder.id}
                    </h2>

                    <div className="space-y-3">
                        <p>
                            <strong>User:</strong> {selectedOrder.userId}
                        </p>

                        <p>
                            <strong>Product:</strong> {selectedOrder.product}
                        </p>

                        <p>
                            <strong>Brand:</strong> {selectedOrder.brand}
                        </p>

                        <p>
                            <strong>Quantity:</strong> {selectedOrder.quantity}
                        </p>

                        <p>
                            <strong>Status:</strong> {selectedOrder.status}
                        </p>

                        <p>
                            <strong>Price:</strong>{" "}
                            {selectedOrder.price ?? "—"}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(selectedOrder.createdAt
                            ).toLocaleDateString("ru-RU")}
                        </p>
                    </div>

                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="mt-6 px-4 py-2 rounded-lg bg-red-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}</div>
    )
}
