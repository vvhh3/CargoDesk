import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../shared/ui/Input"
import { Button } from "../../../shared/ui/Button"
import { Logo } from "../../../shared/ui/Logo"
import { AuthGoogle } from "../../../features/auth/components/AuthGoogle"
import { authApi } from "../../../features/auth/api"
import { useAuthStore } from "../../../entities/user"
import { toast } from "react-hot-toast"
import github from "../../../assets/github.svg"

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email обязателен").email("Не корректный email"),
  password: z.string().trim().min(3, "Пароль обязателен"),
})

type LoginFormType = z.infer<typeof loginSchema>

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  })

  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await authApi.login(data)
      reset()
      setUser(res.user)
      toast.success(res.message)
      navigate(`/dashboard/${res.user.role}`)
    } catch (e: any) {
      const message = e?.response?.data?.message || "Попробуйте ещё раз"
      toast.error(message)
    }
  }

  return (
    <div className="w-full flex">
      <div className="w-full flex flex-col justify-center items-center bg-linear-to-br from-[#7C3AED]/20 via-[#09090B] to-[#3B82F6]/20">
        <div className="relative w-6/10 h-6/10 bg-white/5 p-5 flex gap-5 flex-col border border-white/10 rounded-3xl">
          <div className="absolute right-1/3 w-96 h-96 bg-[#7C3AED]/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-[120px] animate-pulse"></div>

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
            <div className="h-full flex items-end gap-2 justify-around">
              {[50, 70, 45, 60, 69, 60, 70, 85, 75, 80, 95].map(
                (height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="bg-[#8B5CF6] flex-1 rounded-t-xl"
                  ></div>
                )
              )}
            </div>
          </div>

          <div className="w-ful flex flex-col gap-3">
            {["Order #2847 shipped", "New client registered", "Payment received"].map(
              (text, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-white/5 border border-white/10 rounded-2xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white">{text}</span>
                  </div>
                  <span className="text-zinc-400">2m ago</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-20 w-full">
          <div className="flex flex-col items-center">
            <div className="mb-5 flex flex-col items-center gap-2 text-3xl">
              <span className="text-white">Manage cargo operations</span>
              <span className="bg-linear-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
                from anywhere
              </span>
            </div>
            <span className="text-zinc-400">
              Real-time tracking, analytics, and team collaboration in one platform
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full min-h-screen">
        <div className="flex-col items-start w-6/10 py-20">
          <Logo />

          <div className="flex flex-col gap-3 mt-10">
            <span className="text-white text-5xl">Welcome back</span>
            <span className="text-zinc-400 text-xl">
              Sign in to your account to continue
            </span>
          </div>

          <form
            className="flex flex-col mt-10 gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Email"
              icon={Mail}
              type="email"
              placeholder="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              icon={Lock}
              type="password"
              placeholder="password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="w-full flex justify-between mt-5">
              <label className="text-zinc-400 cursor-pointer">
                <input type="checkbox" />
                <span> Remember me</span>
              </label>
              <Link
                to="/"
                className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              size="lg"
              className="w-full mt-5"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="relative flex mt-10 justify-center items-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative">
              <span className="relative px-4 bg-[#09090B] text-zinc-400">
                or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-10 gap-4">
            <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
              <img src={`${github}`} className="w-5 h-5" />
            </button>
            <AuthGoogle />
          </div>

          <div className="w-full flex justify-center mt-5">
            <span className="text-zinc-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-500">
                Sign up for free
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
