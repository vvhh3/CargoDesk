
import Logo from "../Components/Logo/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import github from "../assets/github.svg"
import google from "../assets/google.svg"

const LogIn = () => {

    return (
        <div className="w-full flex">

            <div className="w-1/2 bg-white min-h-screen">
                123
            </div>

            {/* Left screen */}
            <div className="flex justify-center w-1/2 min-h-screen">
                <div className="flex-col items-start w-6/10 py-20">

                    <div>
                        <Logo />
                    </div>
                    <div className="flex flex-col gap-3 mt-10">
                        <span className="text-white text-5xl">Welcome back</span>
                        <span className="text-zinc-400 text-xl">Sign in to your account to continue</span>
                    </div>

                    {/* inputs */}
                    <div>

                        <div className="flex flex-col mt-10 gap-5">
                            {/* email */}
                            <div className="relative flex flex-col gap-3">
                                <label className="text-zinc-300">Email</label>
                                <Mail className="absolute top-2/3 left-4 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input type="email"
                                    placeholder="email"
                                    className="relative rounded-xl bg-white/5 placeholder:text-zinc-500 pl-12 p-4 text-white border border-white/10 focus:outline-none focus:border-[#7C3AED] transition-all" />
                            </div>
                            {/* password */}
                            <div className="relative flex  flex-col gap-3">
                                <label className="text-zinc-300">Password</label>
                                <Lock className="absolute top-2/3 left-4 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input type="password"
                                    placeholder="password"
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
                            <button className="flex w-full p-3 justify-center bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] 
                            items-center rounded-2xl text-white hover:from-[#8B5CF6] hover:to-[#7C3AED]">
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
                            <span className="text-zinc-400">Don't have an account? <Link to="/login" className="text-purple-500">Sign up for free</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;