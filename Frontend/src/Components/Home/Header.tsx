
import { Package } from "lucide-react"
import { Link } from "react-router-dom"
const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-30 py-7 backdrop-blur-xl bg-[#09090B]/80 border-b border-white/10">
            <div className="flex gap-3 items-center">
                <div className="flex justify-center items-center rounded-xl w-10 h-10 bg-linear-to-br from-[#7C3AED] to-[#3B82F6]">
                    <Link to="/"><Package className="text-2xl text-white " /> </Link>
                </div>
                <h1 className="text-white text-2xl">CargoDesk</h1>
            </div>
            <nav className="flex text-gray-400 gap-6 items-center text-base">
                    <a href="#" className="hover:text-white duration-500">Features</a>
                    <a href="#" className="hover:text-white duration-500">Workflow</a>
                    <a href="#" className="hover:text-white duration-500">Pricing</a>
                    <Link to="" className="hover:text-white duration-500">Sign In</Link>
                <button className="w-28 h-13 text-white rounded-2xl bg-linear-to-br from-[#7C3AED] to-[#3B82F6] duration-300 hover:scale-102 cursor-pointer">
                    Get Started
                </button>
            </nav>
        </div>
    )
}
export default Header