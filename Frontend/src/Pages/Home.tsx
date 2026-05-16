
import Header from "../Components/Home/Header"
import { Star, MoveRight, CheckCircle2, Package, Globe, Zap, Shield, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import Logo from "../Components/Logo/Logo"
// шрифт
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

const Home = () => {

    return (
        <div>
            <header>
                <Header />
            </header>

            {/* Header-main */}
            <section className="flex flex-col items-center mt-30">

                <div className="absolute top-10 left-1/4 bg-[#7C3AED]/20 w-96 h-96 rounded-full blur-[120px]"></div>
                <div className="absolute top-40 right-1/4 bg-[#3B82F6]/20 w-96 h-96 rounded-full blur-[120px]"></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 mt-15">
                    <div><Star className="w-4 h-4 text-[#7C3AED]" /></div>
                    <span className="text-sm text-zinc-300">Trusted by 10,000+ businesses worldwide</span>
                </div>

                <div className="mt-4 mb-25">
                    <div className="flex items-center flex-col text-7xl gap-0">
                        <span className="text-white">Transform Your</span>
                        <span className="text-[#7C3AED]">Cargo Operations</span>
                    </div>
                    <div className="flex flex-col items-center text-xl text-zinc-400 mb-10 mt-10">
                        <p>Streamline order management, delivery tracking, and team</p>
                        <p>collaboration with our next-generation SaaS platform </p>
                    </div>

                    <div className="flex justify-center gap-5">
                        <Link to='/register' className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]">
                            Start Free Trial <MoveRight />
                        </Link>
                        <button className="flex justify-center items-center gap-2 
                        text-white px-8 py-4 rounded-2xl bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 duration-500">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* DashBoard demo */}
                <div className="w-full bg-white/5 rounded-3xl max-w-6xl mx-auto shadow-cyan-700/70 shadow-2xl">
                    {/* <div className=""> */}
                    <div className="flex flex-col w-full px-10 pt-8 pb-10">

                        <div className="flex gap-2 max-h-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        </div>

                        <div className="flex mt-7 gap-5 w-full">

                            <div>
                                <div className="w-70 border border-white/10 rounded-2xl p-5 h-[450px]">
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <div className="h-12 rounded-xl bg-white/5 backdrop-blur-sm" key={i}></div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-1 flex-col min-w-0">

                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {['1', '2', '3'].map(i => (
                                        <div key={i} className="p-4 rounded-2xl  border border-white/10 backdrop-blur-xl">
                                            <div className="h-3 w-16 bg-white/20 rounded mb-3"></div>
                                            <div className="h-6 w-24 bg-white/30 rounded"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-[350px] w-full rounded-2xl border border-white/10 backdrop-blur-xl p-6 mt-5">
                                    <div className="flex items-end justify-between h-full">
                                        {[40, 70, 55, 85, 60, 68, 90, 75, 95].map((height, i) => (
                                            <div key={i} className="flex-1 max-w-12 rounded-t-xl bg-[#7C3AED] " style={{ height: `${height}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </section>

            {/* main */}
            <section>

                <div className="flex justify-center items-center gap-10 mt-35 mb-10">
                    <div className="flex flex-col border border-[#8B5CF6]/5 rounded-2xl px-10 py-5
                        shadow-[#8B5CF6]/40 shadow-xl bg-white/5 w-[300px] max-w-[300px] hover:scale-102 hover:border-[#8B5CF6]/50 duration-500">
                        <span className="text-[#8B5CF6] text-3xl">50K+</span>
                        <span className="text-zinc-400">Active Shipments</span>
                    </div>

                    <div className="flex flex-col border border-[#2563EB]/5 rounded-2xl px-10 py-5
                        shadow-[#2563EB]/40 shadow-xl bg-white/5 w-[300px] max-w-[300px] hover:scale-102 hover:border-[#2563EB]/50 duration-500">
                        <span className="text-[#2563EB] text-3xl">99%</span>
                        <span className="text-zinc-400">Uptime SLA</span>
                    </div>

                    <div className="flex flex-col border border-[#16A34A]/5 rounded-2xl px-10 py-5
                        shadow-[#16A34A]/40 shadow-xl bg-white/5 w-[300px] max-w-[300px] hover:scale-102 hover:border-[#16A34A]/50 duration-500">
                        <span className="text-[#16A34A] text-3xl">~2min</span>
                        <span className="text-zinc-400">Avg Response</span>
                    </div>

                    <div className="flex flex-col border border-[#D97706]/5 rounded-2xl px-10 py-5
                        shadow-[#D97706]/40 shadow-xl bg-white/5 w-[300px] max-w-[300px] hover:scale-102 hover:border-[#D97706]/50 duration-500">
                        <span className="text-[#D97706] text-3xl">100+</span>
                        <span className="text-zinc-400">Countries</span>
                    </div>
                </div>

                {/* Cargo tools */}
                <div className="mt-40 flex flex-col justify-center items-center">

                    <div className="flex flex-col justify-center items-center mb-20 gap-3">
                        <span className="text-white text-4xl">Powerful Features</span>
                        <span className="text-zinc-400 text-2xl">Everything you need to manage cargo operations at scale</span>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-10 max-w-[1300px]">

                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                                gap-5 rounded-xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-purple-500">
                            <div className="text-white bg-purple-500 rounded-xl w-10 h-10 justify-center items-center flex">
                                <TrendingUp />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Real-time Analytics</span>
                                <span className="text-zinc-400">Monitor performance with live dashboards and AI-powered insights</span>
                            </div>
                        </div>

                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                        gap-5 rounded-2xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-[#2563EB]">
                            <div className="text-white bg-[#2563EB] rounded-xl w-10 h-10 justify-center items-center flex">
                                <Shield />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Enterprise Security</span>
                                <span className="text-zinc-400">Bank-level encryption and compliance with global standards</span>
                            </div>
                        </div>

                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                        gap-5 rounded-2xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-[#D97706]">
                            <div className="text-white bg-[#D97706] rounded-xl w-10 h-10 justify-center items-center flex">
                                <Zap />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Lightning Fast</span>
                                <span className="text-zinc-400">Optimized performance with sub-second response times</span>
                            </div>
                        </div>

                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                        gap-5 rounded-2xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-[#16A34A]">
                            <div className="text-white bg-[#16A34A] rounded-xl w-10 h-10 justify-center items-center flex">
                                <Globe />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Global Coverage</span>
                                <span className="text-zinc-400">Seamless operations across 150+ countries worldwide</span>
                            </div>
                        </div>

                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                            gap-5 rounded-2xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-[#DB2777]">
                            <div className="text-white bg-[#DB2777] rounded-xl w-10 h-10 justify-center items-center flex">
                                <Package />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Smart Routing</span>
                                <span className="text-zinc-400">AI-optimized delivery routes for maximum efficiency</span>
                            </div>
                        </div>


                        <div className="bg-white/5 flex flex-col justify-center items-start border border-white/10 
                                gap-5 rounded-2xl p-10 w-[400px] max-w-[400px] hover:scale-102 duration-500 hover:border-[#7C3AED]">
                            <div className="text-white bg-[#7C3AED] rounded-xl w-10 h-10 justify-center items-center flex">
                                <CheckCircle2 />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white">Automated Workflows</span>
                                <span className="text-zinc-400">Reduce manual work with intelligent automation</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <section>
                <div className="mt-40">

                    <div className="flex justify-center">
                        <div className="flex flex-col items-center gap-5 border border-white/10 bg-white/5 px-25 py-14 rounded-4xl shadow-purple-400 shadow-2xl">
                            {/* bg-clip-text делает фон токо на буквы text-transparent делает буквы прозрачными */}
                            <span className="bg-linear-to-r text-5xl from-white to-zinc-400 bg-clip-text text-transparent">Ready to Get Started?</span>
                            <span className="text-zinc-400 text-xl mb-7">Join thousands of businesses transforming their cargo operations</span>
                            <Link to='/register' className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]">
                                Start Free Trial <MoveRight />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-40 border border-t-white/10 flex justify-between py-5 px-20">
                        <Logo/>
                        <div>
                            <span className="text-white/50">© 2026 CargoDesk. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
