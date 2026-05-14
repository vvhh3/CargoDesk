
import Logo from "../Components/Logo/Logo"
import { User,Mail } from "lucide-react"

const Registry = () => {

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
                <div className="flex flex-col items-start w-7/10 py-15">
                    <div>
                        <Logo />
                    </div>
                    <div className="flex flex-col gap-4 mt-20">
                        <span className="text-white text-5xl">Create account</span>
                        <span className="text-zinc-400 text-xl">Start your 14-day free trial today</span>
                    </div>

                    <div className="mt-10 flex flex-wrap w-full flex-col gap-10">
                        <div className="flex gap-5 w-full">

                            <div className="w-1/2">
                                <label className="block text-sm text-zinc-300 mb-2">First name</label>
                                <div className="relative">
                                    <User className="absolute top-1/3 left-4 w-5 h-5 text-zinc-500" />
                                    <input
                                        placeholder="Matvei"
                                        className="w-full bg-white/5 pl-12 p-4 border border-white/10 placeholder:text-zinc-400 rounded-xl text-white 
                                            focus:outline-none   focus:border-[#7C3AED] transition-all"/>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <label className="block text-sm text-zinc-300 mb-2">Last name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="p-4 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#7C3AED] transition-all" />
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input placeholder="email"
                                    className="p-4 pl-12 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-400 focus:outline-none  focus:border-[#7C3AED] transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Registry