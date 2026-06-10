import axios from "axios"
import { type FormEvent, useState } from "react"
import toast from "react-hot-toast"

import { LinkIcon, Package, Upload } from "lucide-react"


export default function ClientCreateRequest() {

    const [form, setForm] = useState({
        link: "",
        product: "",
        brand: "",
        quantity: 1,
        productImages: [] as File[],
    })

    const create = async (e: FormEvent) => {
        e.preventDefault()

        // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
        console.log("image", form.productImages)
        if (form.productImages.some(file => file.size > 10 * 1024 * 1024)) {
            toast.error("max image size 10MB")
            return
        }
        try {
            const res = await axios.post("http://localhost:5000/order", {
                link: form.link,
                product: form.product,
                brand: form.brand,
                quantity: form.quantity,
                productImages: form.productImages.map(file => file.name),
            }, {
                withCredentials: true
            })

            setForm({
                link: "",
                product: "",
                brand: "",
                quantity: 1,
                productImages: [],
            })
            toast.success(res.data.message)
        } catch (e: any) {
            const mes = e.response.data.message || "error"
            toast.error(mes)
            console.log(e)
        }
    }

    return (
        <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">New Purchase Request</h2>
                            <p className="text-zinc-400">Fill in the details below to submit a new order request</p>
                        </div>
                        <form onSubmit={create} className="space-y-6">
                            <div className="p-6 rounded-2xl bg-[#111113] border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Product Information</h3>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-zinc-300 mb-2">Product Link</label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                            <input
                                                type="url"
                                                value={form.link}
                                                onChange={(e) => setForm({ ...form, link: e.target.value })}
                                                placeholder="https://example.com/product"
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Product Name</label>
                                            <input
                                                type="text"
                                                value={form.product}
                                                onChange={(e) => setForm({ ...form, product: e.target.value })}
                                                placeholder="iPhone 15 Pro Max"
                                                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Brand</label>
                                            <input
                                                type="text"
                                                value={form.brand}
                                                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                                placeholder="Apple"
                                                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Quantity</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={form.quantity}
                                                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                                                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                                            />
                                        </div>
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

                                <label className="p-12 text-center transition-all cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <Upload className="w-8 h-8 text-zinc-300" />
                                    </div>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        multiple
                                        hidden
                                        onChange={(e) => setForm(prev => ({
                                            ...prev,
                                            productImages: [...prev.productImages, ...Array.from(e.target.files || [])]

                                        }))} />
                                    <h4 className="text-lg font-medium mb-2">Drop files here</h4>
                                    <p className="text-zinc-400 mb-4">PNG, JPG or WebP (Max. 10MB)</p>
                                </label>

                                <div className="flex justify-center">
                                    {form.productImages.length > 0 && (
                                        <div className="flex flex-wrap gap-3 justify-center">

                                            {form.productImages.map((file, i) => (
                                                <div key={i} className="relative">

                                                    <button className="text-lg absolute -top-3 -right-2 text-white cursor-pointer" 
                                                    type="button"
                                                    onClick={() => setForm(prev => ({
                                                        ...prev,
                                                        productImages: form.productImages.filter((_,id) => id !== i)
                                                    }))}>✕</button>

                                                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-35 h-35"/>
                                                    <p className="text-zinc-300 mt-1 truncate max-w-24">{file.name}</p>
                                                </div>
                                            ))}

                                        </div>
                                    )}
                                </div>
                            
                            </div>

                            <div className="flex items-center gap-4">
                                <button type="submit" className="flex-1 py-4 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all text-lg font-medium cursor-pointer">
                                    Submit Request
                                </button>
                                <button type="button" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                                    Save Draft
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
