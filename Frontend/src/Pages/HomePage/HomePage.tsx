import { Header } from "./Header.tsx"
import {
  Star,
  MoveRight,
  CheckCircle2,
  Package,
  Globe,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "../../shared/ui/Logo"

export function HomePage() {
  return (
    <div>
      <header>
        <Header />
      </header>

      <section className="flex flex-col items-center mt-30">
        <div className="absolute top-10 left-1/4 bg-[#7C3AED]/20 w-96 h-96 rounded-full blur-[120px]"></div>
        <div className="absolute top-40 right-1/4 bg-[#3B82F6]/20 w-96 h-96 rounded-full blur-[120px]"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 mt-15">
          <div>
            <Star className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <span className="text-sm text-zinc-300">
            Trusted by 10,000+ businesses worldwide
          </span>
        </div>

        <div className="mt-4 mb-25">
          <div className="flex items-center flex-col text-7xl gap-0">
            <span className="text-white">Transform Your</span>
            <span className="text-[#7C3AED]">Cargo Operations</span>
          </div>
          <div className="flex flex-col items-center text-xl text-zinc-400 mb-10 mt-10">
            <p>
              Streamline order management, delivery tracking, and team
            </p>
            <p>
              collaboration with our next-generation SaaS platform{" "}
            </p>
          </div>

          <div className="flex justify-center gap-5">
            <Link
              to="/register"
              className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]"
            >
              Start Free Trial <MoveRight />
            </Link>
            <button className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 duration-500">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-3xl max-w-6xl mx-auto shadow-cyan-700/70 shadow-2xl">
          <div className="flex flex-col w-full px-10 pt-8 pb-10">
            <div className="flex gap-2 max-h-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>

            <div className="flex mt-7 gap-5 w-full">
              <div>
                <div className="w-70 border border-white/10 rounded-2xl p-5 h-112.5">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        className="h-12 rounded-xl bg-white/5 backdrop-blur-sm"
                        key={i}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col min-w-0">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {["1", "2", "3"].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-white/10 backdrop-blur-xl"
                    >
                      <div className="h-3 w-16 bg-white/20 rounded mb-3"></div>
                      <div className="h-6 w-24 bg-white/30 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="h-87.5 w-full rounded-2xl border border-white/10 backdrop-blur-xl p-6 mt-5">
                  <div className="flex items-end justify-between h-full">
                    {[40, 70, 55, 85, 60, 68, 90, 75, 95].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 max-w-12 rounded-t-xl bg-[#7C3AED]"
                          style={{ height: `${height}%` }}
                        ></div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-center items-center gap-10 mt-35 mb-10">
          {[
            { value: "50K+", label: "Active Shipments", color: "#8B5CF6" },
            { value: "99%", label: "Uptime SLA", color: "#2563EB" },
            { value: "~2min", label: "Avg Response", color: "#16A34A" },
            { value: "100+", label: "Countries", color: "#D97706" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col border border-[${stat.color}]/5 rounded-2xl px-10 py-5 shadow-[${stat.color}]/40 shadow-xl bg-white/5 w-75 max-w-75 hover:scale-102 hover:border-[${stat.color}]/50 duration-500`}
            >
              <span className={`text-[${stat.color}] text-3xl`}>
                {stat.value}
              </span>
              <span className="text-zinc-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-40 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center mb-20 gap-3">
            <span className="text-white text-4xl">Powerful Features</span>
            <span className="text-zinc-400 text-2xl">
              Everything you need to manage cargo operations at scale
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 max-w-325">
            {[
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                desc: "Monitor performance with live dashboards and AI-powered insights",
                hoverColor: "hover:border-purple-500",
                bgColor: "bg-purple-500",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Bank-level encryption and compliance with global standards",
                hoverColor: "hover:border-[#2563EB]",
                bgColor: "bg-[#2563EB]",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance with sub-second response times",
                hoverColor: "hover:border-[#D97706]",
                bgColor: "bg-[#D97706]",
              },
              {
                icon: Globe,
                title: "Global Coverage",
                desc: "Seamless operations across 150+ countries worldwide",
                hoverColor: "hover:border-[#16A34A]",
                bgColor: "bg-[#16A34A]",
              },
              {
                icon: Package,
                title: "Smart Routing",
                desc: "AI-optimized delivery routes for maximum efficiency",
                hoverColor: "hover:border-[#DB2777]",
                bgColor: "bg-[#DB2777]",
              },
              {
                icon: CheckCircle2,
                title: "Automated Workflows",
                desc: "Reduce manual work with intelligent automation",
                hoverColor: "hover:border-[#7C3AED]",
                bgColor: "bg-[#7C3AED]",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`bg-white/5 flex flex-col justify-center items-start border border-white/10 gap-5 rounded-xl p-10 w-100 max-w-100 hover:scale-102 duration-500 ${feature.hoverColor}`}
              >
                <div
                  className={`text-white ${feature.bgColor} rounded-xl w-10 h-10 justify-center items-center flex`}
                >
                  <feature.icon />
                </div>
                <div className="flex flex-col">
                  <span className="text-white">{feature.title}</span>
                  <span className="text-zinc-400">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mt-40">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-5 border border-white/10 bg-white/5 px-25 py-14 rounded-4xl shadow-purple-400 shadow-2xl">
              <span className="bg-linear-to-r text-5xl from-white to-zinc-400 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
              <span className="text-zinc-400 text-xl mb-7">
                Join thousands of businesses transforming their cargo operations
              </span>
              <Link
                to="/register"
                className="flex justify-center items-center gap-2 text-white px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-lg hover:from-[#8B5CF6] hover:to-[#7C3AED]"
              >
                Start Free Trial <MoveRight />
              </Link>
            </div>
          </div>

          <div className="mt-40 border border-t-white/10 flex justify-between py-5 px-20">
            <Logo />
            <div>
              <span className="text-white/50">
                © 2026 CargoDesk. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
