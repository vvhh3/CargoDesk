import axios from "axios"
import { useState } from "react"


export default function ClientCreate() {

    const [createRequest, setCreateRequest] = useState('')

    const create = async () => {
        try{
            
            const res = axios.post("http://localhost:5000/order",{
                product:createRequest
            },{
                withCredentials: true
            })

            console.log("res",res)

        }catch(e){
            console.log(e)
        }
    }
    return (
        <div>
            <div className="flex flex-col mt-10 gap-5">
                {/* email */}
                <div className="relative flex flex-col gap-3">
                    <label className="text-zinc-300">Email</label>
                    {/* <Mail className="absolute top-2/3 left-4 -translate-y-1/2 w-5 h-5 text-zinc-400" /> */}
                    <input
                        placeholder="product"
                        value={createRequest}
                        onChange={(e) => setCreateRequest(e.target.value)}
                        className="relative rounded-xl bg-white/5 placeholder:text-zinc-500 pl-12 p-4 text-white border border-white/10 focus:outline-none focus:border-[#7C3AED] transition-all" />
                </div>
            </div>

            <div className="w-full mt-5">
                <button className="flex w-full p-3 cursor-pointer justify-center bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] 
                            items-center rounded-2xl text-white hover:from-[#8B5CF6] hover:to-[#7C3AED]"
                    onClick={ create}>
                    create
                    {/* <ArrowRight className="w-5 h-5" /> */}
                </button>
            </div>
        </div>
    )
}
