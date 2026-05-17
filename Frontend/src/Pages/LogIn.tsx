
import Logo from "../Components/Logo/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import github from "../assets/github.svg"
import google from "../assets/google.svg"
import axios from "axios";

import {useStoreAuth} from "../Store/AuthStore"
import { useState } from "react";
const LogIn = () => {

    const [loginForm,setLoginForm] = useState({email:"",password:""})

    const setUser = useStoreAuth((state) => state.setUser)
    const navigate = useNavigate()

    const testfetch = async (email:string,password:string) => {
        try {
            const t = await axios.post("http://localhost:5000/auth/login", {
                email: email,
                password: password
            },{
                withCredentials:true //разрешает работать с cookie
            })
            setUser(t.data.user)
            navigate("/dashboard")
            console.log("login", t)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="w-full flex">

            {/* Right */}
            <div className="w-full flex flex-col justify-center items-center bg-linear-to-br from-[#7C3AED]/20 via-[#09090B] to-[#3B82F6]/20">

                {/* Card */}

                <div className="relative w-6/10 h-6/10 bg-white/5 p-5 flex gap-5 flex-col border border-white/10 rounded-3xl">

                    {/* пулбсирующие фигни */}
                    <div className="absolute right-1/3  w-96 h-96 bg-[#7C3AED]/30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="flex w-full gap-5">
                        <div className="w-1/2 bg-white/5 border border-white/10 flex flex-col rounded-2xl items-start pl-4 gap-3 pr-10 py-5">
                            <span className="text-zinc-400 text-xl">Active Orders</span>
                            <span className="text-[#8B5CF6] text-2xl">2,547</span>
                            <span className="text-[#22C55E] text-sm">+12.5%</span>
                        </div>
                        <div className="w-1/2 bg-white/5 border border-white/10 flex flex-col rounded-2xl items-start pl-4 gap-3 pr-10 py-5">
                            <span className="text-zinc-400 text-xl">Revenue</span>
                            <span className="text-[#22C55E] text-2xl">$48.2K</span>
                            <span className="text-[#22C55E] text-sm">+8.3%</span>
                        </div>
                    </div>

                    <div className="w-full bg-white/5 h-48 border border-white/10 rounded-2xl p-4">
                        <div className="h-full  flex items-end gap-2 justify-around">
                            {[50, 70, 45, 60, 69, 60, 70, 85, 75, 80, 95].map((height, i) => (
                                <div key={i}
                                    style={{ height: `${height}%` }}
                                    className={`bg-[#8B5CF6] flex-1 rounded-t-xl `}></div>
                            ))}
                        </div>
                    </div>

                    <div className="w-ful flex flex-col gap-3">
                        {["Order #2847 shipped", "New client registered", "Payment received"].map((text, i) => (
                            <div key={i}
                                className="flex justify-between bg-white/5 border border-white/10 rounded-2xl p-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-white">{text}</span>
                                </div>
                                <span className="text-zinc-400">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 w-full">
                    <div className="flex flex-col items-center">
                        <div className="mb-5 flex flex-col items-center gap-2 text-3xl">
                            <span className="text-white">Manage cargo operations</span>
                            <span className="bg-linear-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">from anywhere</span>
                        </div>
                        <span className="text-zinc-400">Real-time tracking, analytics, and team collaboration in one platform</span>
                    </div>
                </div>
            </div>


            {/* Left screen */}
            <div className="flex justify-center w-full min-h-screen">
                <div className="flex-col items-start w-6/10 py-20">

                    <div>
                        <Logo />
                    </div>
                    <div className="flex flex-col gap-3 mt-10">
                        <span className="text-white text-5xl">Welcome back</span>
                        <span className="text-zinc-400 text-xl">Sign in to your account to continue</span>
                    </div>

                    {/* inputs */}

                    <div className="flex flex-col mt-10 gap-5">
                        {/* email */}
                        <div className="relative flex flex-col gap-3">
                            <label className="text-zinc-300">Email</label>
                            <Mail className="absolute top-2/3 left-4 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input type="email"
                                placeholder="email"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({...loginForm,email: e.target.value})}
                                className="relative rounded-xl bg-white/5 placeholder:text-zinc-500 pl-12 p-4 text-white border border-white/10 focus:outline-none focus:border-[#7C3AED] transition-all" />
                        </div>
                        {/* password */}
                        <div className="relative flex  flex-col gap-3">
                            <label className="text-zinc-300">Password</label>
                            <Lock className="absolute top-2/3 left-4 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input type="password"
                                placeholder="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({...loginForm,password:e.target.value})}
                                className="relative rounded-xl bg-white/5 placeholder:text-zinc-500 pl-12 p-4 text-white border border-white/10 focus:outline-none focus:border-[#7C3AED] transition-all" />
                        </div>
                    </div>

                    <div className="w-full flex justify-between mt-5">
                        <label className="text-zinc-400 cursor-pointer">
                            <input type="checkBox" />
                            <span> Remember me</span>
                        </label>
                        <Link to="/" className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors">Forgot password?</Link>
                    </div>

                    <div className="w-full mt-5">
                        <button className="flex w-full p-3 cursor-pointer justify-center bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] 
                            items-center rounded-2xl text-white hover:from-[#8B5CF6] hover:to-[#7C3AED]"
                            onClick={() => testfetch(loginForm.email,loginForm.password)}>
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative flex mt-10 justify-center items-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative">
                            <span className="relative px-4 bg-[#09090B] text-zinc-400 ">or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10 gap-4">
                        <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
                            <img src={`${github}`} className="w-5 h-5" />
                        </button>
                        <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
                            <img src={`${google}`} className="w-5 h-5" />
                        </button>

                    </div>

                    <div className="w-full flex justify-center mt-5">
                        <span className="text-zinc-400">Don't have an account? <Link to="/register" className="text-purple-500">Sign up for free</Link></span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LogIn;
