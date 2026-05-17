
import Logo from "../Components/Logo/Logo"
import { User, Mail, Building, Lock, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import github from "../assets/github.svg"
import google from "../assets/google.svg"

import axios from "axios"
import { useState } from "react"
import { useStoreAuth } from "../Store/AuthStore"

type RegistryType = {
    name: string
    lastName: string
    email: string
    companyName: string
    password: string
}
const Registry = () => {

    const [refistryForm, setRegistryForm] = useState<RegistryType>({
        name: "",
        lastName: "",
        email: "",
        companyName: "",
        password: ""
    })

    const navigate = useNavigate()
    const setUser = useStoreAuth((state) => state.setUser)

    const registry = async (
        name: string,
        lastName: string,
        email: string,
        companyName: string,
        password: string
    ) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/register",
                {
                    name: name,
                    lastName: lastName,
                    email: email,
                    companyName: companyName,
                    password: password
                }, {
                withCredentials: true
            })

            setUser(res.data.user)
            navigate("/dashboard")
            console.log("res", res)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="w-full flex">

            {/* Left часть */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#3B82F6]/20 via-[#09090B] to-[#7C3AED]/20"></div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#7C3AED]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#22C55E]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-center w-full p-16">
                    <div className="max-w-lg">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Join 10,000+ businesses
                                <br />
                                <span className="bg-linear-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                                    transforming logistics
                                </span>
                            </h2>
                            <p className="text-zinc-400 text-lg">
                                Start your 14-day free trial. No credit card required.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: '⚡', title: 'Instant Setup', description: 'Get started in under 5 minutes' },
                                { icon: '🔒', title: 'Enterprise Security', description: 'Bank-level encryption & compliance' },
                                { icon: '📊', title: 'Real-time Analytics', description: 'Track everything that matters' },
                                { icon: '🌍', title: 'Global Coverage', description: 'Operations in 150+ countries' },
                            ].map((feature) => (
                                <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-3xl">{feature.icon}</div>
                                    <div>
                                        <div className="font-semibold text-white mb-1">{feature.title}</div>
                                        <div className="text-sm text-zinc-400">{feature.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right часть */}
            <div className="flex justify-center min-h-screen w-1/2">
                <div className="flex flex-col items-start w-7/10 pt-10">

                    <div>
                        <Logo />
                    </div>

                    <div className="flex flex-col gap-4 mt-5">
                        <span className="text-white text-4xl">Create account</span>
                        <span className="text-zinc-400 text-xl">Start your 14-day free trial today</span>
                    </div>

                    <div className="mt-10 flex flex-wrap w-full flex-col gap-5">
                        <div className="flex gap-5 w-full">
                            {/* name */}
                            <div className="w-1/2">
                                <label className="block text-sm text-zinc-300 mb-2">First name</label>
                                <div className="relative">
                                    <User className="absolute top-1/3 left-4 w-5 h-5 text-zinc-500" />
                                    <input
                                        value={refistryForm.name}
                                        onChange={(e) => setRegistryForm({ ...refistryForm, name: e.target.value })}
                                        placeholder="Matvei"
                                        className="w-full bg-white/5 pl-12 p-4 border border-white/10 placeholder:text-zinc-400 rounded-xl text-white 
                                            focus:outline-none   focus:border-[#7C3AED] transition-all"/>
                                </div>
                            </div>
                            {/* last name */}
                            <div className="w-1/2">
                                <label className="block text-sm text-zinc-300 mb-2">Last name</label>
                                <input
                                    value={refistryForm.lastName}
                                    onChange={(e) => setRegistryForm({ ...refistryForm, lastName: e.target.value })}
                                    placeholder="Doe"
                                    className="p-4 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#7C3AED] transition-all" />
                            </div>

                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    value={refistryForm.email}
                                    onChange={(e) => setRegistryForm({ ...refistryForm, email: e.target.value })}
                                    placeholder="email"
                                    type="email"
                                    className="p-4 pl-12 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none  focus:border-[#7C3AED] transition-all" />
                            </div>
                        </div>

                        {/* Company name */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">Company name</label>
                            <div className="relative">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    value={refistryForm.companyName}
                                    onChange={(e) => setRegistryForm({ ...refistryForm, companyName: e.target.value })}
                                    placeholder="Acme Inc."
                                    className="p-4 pl-12 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none  focus:border-[#7C3AED] transition-all" />
                            </div>
                        </div>
                        {/* password */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    value={refistryForm.password}
                                    onChange={(e) => setRegistryForm({ ...refistryForm, password: e.target.value })}
                                    placeholder="Create a strong password"
                                    type="password"
                                    className="p-4 pl-12 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none  focus:border-[#7C3AED] transition-all" />
                            </div>
                        </div>
                        {/* checkbox */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2 ml-2 cursor-pointer">
                                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-[#7C3AED] focus:ring-[#7C3AED]/50" />
                                <span className="pl-2 ">I agree to the </span>
                                <a href="#" className="text-purple-500 hover:underline">Terms of Service</a>
                                <span> and </span>
                                <a href="#" className="text-purple-500 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <div>
                            <button className="p-3 gap-3 w-full flex justify-center items-center bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-white
                            hover:from-[#8B5CF6] hover:to-[#7C3AED] rounded-2xl cursor-pointer"
                                onClick={() => registry(refistryForm.name,
                                    refistryForm.lastName,
                                    refistryForm.email,
                                    refistryForm.companyName,
                                    refistryForm.password
                                )}>
                                Create Account
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sign In */}
                        <div className="relative mt-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-[#09090B] text-zinc-500">or sign up with</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
                                <img src={`${github}`} className="w-5 h-5" />
                            </button>
                            <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
                                <img src={`${google}`} className="w-5 h-5" />
                            </button>

                        </div>
                        <div className="w-full flex justify-center ">
                            <span className="text-zinc-400">Already have an account? <Link to="/login" className="text-purple-500">Sign in</Link></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Registry
