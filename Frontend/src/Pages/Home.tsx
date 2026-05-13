
import Header from "../Components/Home/Header"
import { Star, MoveRight } from "lucide-react"
import { Link } from "react-router-dom"

// шрифт
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

const Home = () => {

    return (
        <div>
            <nav>
                <Header />
            </nav>

            {/* Header-main */}
            <section className="flex flex-col items-center">

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
                        <Link to='/registry' className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]">
                            Start Free Trial <MoveRight />
                        </Link>
                        <button className="flex justify-center items-center gap-2 
                        text-white px-8 py-4 rounded-2xl bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 duration-500">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* DashBoard demo */}
                <div className="w-full bg-white/5 rounded-3xl max-w-6xl mx-auto shadow-cyan-700/50 shadow-2xl">
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

            <section>

                    <div className="flex justify-center items-center gap-5 mt-20 mb-10">
                        <div className="flex flex-col border border-[#8B5CF6]/5 rounded-2xl px-10 py-5
                        shadow-[#8B5CF6] shadow-2xl bg-white/5 ">
                            <span className="text-[#8B5CF6] text-2xl">50K+</span>
                            <span className="text-zinc-400">Active Shipments</span>
                        </div>

                        <div className="flex flex-col border border-[#2563EB]/5 rounded-2xl px-10 py-5
                        shadow-[#2563EB] shadow-2xl bg-white/5 ">
                            <span className="text-[#2563EB] text-2xl">99%</span>
                            <span className="text-zinc-400">Uptime SLA</span>
                        </div>

                        <div className="flex flex-col border border-[#16A34A]/5 rounded-2xl px-10 py-5
                        shadow-[#16A34A] shadow-2xl bg-white/5 ">
                            <span className="text-[#16A34A] text-2xl">~2min</span>
                            <span className="text-zinc-400">Avg Response</span>
                        </div>

                        <div className="flex flex-col border border-[#D97706]/5 rounded-2xl px-10 py-5
                        shadow-[#D97706] shadow-2xl bg-white/5 ">
                            <span className="text-[#D97706] text-2xl">100+</span>
                            <span className="text-zinc-400">Countries</span>
                        </div>

                    </div>


            </section>
        </div>
    )
}

export default Home
