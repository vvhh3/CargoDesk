
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

            <section className="flex flex-col items-center">

                <div className="absolute top-10 left-1/4 bg-[#7C3AED]/20 w-96 h-96 rounded-full blur-[120px]"></div>
                <div className="absolute top-40 right-1/4 bg-[#3B82F6]/20 w-96 h-96 rounded-full blur-[120px]"></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 mt-15">
                    <div><Star className="w-4 h-4 text-[#7C3AED]" /></div>
                    <span className="text-sm text-zinc-300">Trusted by 10,000+ businesses worldwide</span>
                </div>

                <div className="mt-4">
                    <div className="flex items-center flex-col text-7xl gap-0">
                        <span className="text-white">Transform Your</span>
                        <span className="text-[#7C3AED]">Cargo Operations</span>
                    </div>
                    <div className="flex flex-col items-center text-xl text-zinc-400 mb-10 mt-10">
                        <p>Streamline order management, delivery tracking, and team</p>
                        <p>collaboration with our next-generation SaaS platform </p>
                    </div>

                    <div className="flex justify-center gap-5">
                        <Link to='/registry' className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]">
                            Start Free Trial <MoveRight />
                        </Link>
                        <button className="flex justify-center items-center gap-2 
                        text-white px-8 py-4 rounded-2xl bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 duration-500">
                            Watch Demo
                        </button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Home