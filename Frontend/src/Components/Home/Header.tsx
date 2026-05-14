
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-30 py-7 backdrop-blur-xl bg-[#09090B]/80 border-b border-white/10">
            <Logo/>
            <nav className="flex text-gray-400 gap-6 items-center text-base">
                    <a href="#" className="hover:text-white duration-500">Features</a>
                    <a href="#" className="hover:text-white duration-500">Workflow</a>
                    <a href="#" className="hover:text-white duration-500">Pricing</a>
                    <Link to="/login" className="hover:text-white duration-500">Sign In</Link>
                <Link to="/registry" className="flex justify-center items-center w-28 h-13 text-white rounded-2xl bg-linear-to-br from-[#7C3AED] to-[#3B82F6] duration-300 hover:scale-102 cursor-pointer">
                    Get Started
                </Link>
            </nav>
        </div>
    )
}
export default Header