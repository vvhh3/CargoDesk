import { type FormEvent, useState } from "react"
import { LinkIcon, Package, Upload } from "lucide-react"
import { Input } from "../../../shared/ui/Input"
import { Button } from "../../../shared/ui/Button"
import { ordersApi } from "../../../features/orders/api"
import toast from "react-hot-toast"

export function ClientCreateRequestPage() {
  const [form, setForm] = useState({
    link: "",
    product: "",
    brand: "",
    quantity: 1,
    productImages: [] as File[],
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const totalSize = form.productImages.reduce(
      (acc, curr) => acc + curr.size,
      0
    )
    if (totalSize > 10 * 1024 * 1024) {
      toast.error("max image size 10MB")
      return
    }

    try {
      await ordersApi.createOrder({
        link: form.link,
        product: form.product,
        brand: form.brand,
        quantity: form.quantity,
        productImages: form.productImages.map((file) => file.name),
      })

      setForm({
        link: "",
        product: "",
        brand: "",
        quantity: 1,
        productImages: [],
      })
      toast.success("Order created successfully")
    } catch (e: any) {
      const mes = e.response?.data?.message || "error"
      toast.error(mes)
    }
  }

  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                New Purchase Request
              </h2>
              <p className="text-zinc-400">
                Fill in the details below to submit a new order request
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#111113] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Product Information
                  </h3>
                </div>
                <div className="space-y-5">
                  <Input
                    label="Product Link"
                    icon={LinkIcon}
                    type="url"
                    value={form.link}
                    onChange={(e) =>
                      setForm({ ...form, link: e.target.value })
                    }
                    placeholder="https://example.com/product"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Product Name"
                      value={form.product}
                      onChange={(e) =>
                        setForm({ ...form, product: e.target.value })
                      }
                      placeholder="iPhone 15 Pro Max"
                    />
                    <Input
                      label="Brand"
                      value={form.brand}
                      onChange={(e) =>
                        setForm({ ...form, brand: e.target.value })
                      }
                      placeholder="Apple"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111113] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Product Images</h3>
                </div>

                <label className="p-12 text-center transition-all cursor-pointer block">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-zinc-300" />
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    multiple
                    hidden
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        productImages: [
                          ...prev.productImages,
                          ...(e.target.files || []),
                        ],
                      }))
                    }
                  />
                  <h4 className="text-lg font-medium mb-2">
                    Drop files here
                  </h4>
                  <p className="text-zinc-400 mb-4">
                    PNG, JPG or WebP (Max. 10MB)
                  </p>
                </label>

                {form.productImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {form.productImages.map((file, i) => (
                      <div key={i} className="relative">
                        <button
                          className="text-lg absolute -top-3 -right-2 text-white cursor-pointer"
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              productImages: prev.productImages.filter(
                                (_, id) => id !== i
                              ),
                            }))
                          }
                        >
                          ✕
                        </button>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-35 h-35"
                        />
                        <p className="text-zinc-300 mt-1 truncate max-w-24">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                >
                  Submit Request
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                >
                  Save Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
