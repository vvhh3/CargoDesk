import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { DollarSign, LinkIcon, Mail, Package, Upload } from "lucide-react"


export default function ClientCreateRequest() {

    const [createRequest, setCreateRequest] = useState('')

    const create = async () => {
        try {
            const res = await axios.post("http://localhost:5000/order", {
                product: createRequest
            }, {
                withCredentials: true
            })

            setCreateRequest("")
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
                        <form className="space-y-6">
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
                                            <input type="url" placeholder="https://example.com/product" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Product Name</label>
                                            <input type="text" placeholder="iPhone 15 Pro Max" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Brand</label>
                                            <input type="text" placeholder="Apple" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm text-zinc-300 mb-2">Quantity</label>
                                            <input type="number" min="1" defaultValue="1" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50" />
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
                                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/30 transition-all">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <Upload className="w-8 h-8 text-zinc-400" />
                                    </div>
                                    <h4 className="text-lg font-medium mb-2">Drop files here</h4>
                                    <p className="text-sm text-zinc-400 mb-4">PNG, JPG or WebP (Max. 10MB)</p>
                                    <button type="button" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                                        Browse Files
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button  onClick={create} className="flex-1 py-4 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all text-lg font-medium">
                                    Submit Request
                                </button>
                                <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
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
