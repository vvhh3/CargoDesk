import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Mail, Building, Lock, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../shared/ui/Input"
import { Button } from "../../../shared/ui/Button"
import { Logo } from "../../../shared/ui/Logo"
import { AuthGoogle } from "../../../features/auth/components/AuthGoogle"
import { authApi } from "../../../features/auth/api"
import { useAuthStore } from "../../../entities/user"
import toast from "react-hot-toast"
import github from "../../../assets/github.svg"

const registrySchema = z.object({
  name: z.string().trim().min(2, "Имя обязательно"),
  lastName: z.string().trim().min(2, "Фамилия обязательна"),
  email: z
    .string()
    .trim()
    .min(2, "Email обязателен")
    .email("Неверный формат email"),
  companyName: z.string().trim().min(2, "Название компании обязательно"),
  password: z.string().trim().min(3, "Пароль должен содержать не менее 3 символов")
    // .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
    // .regex(/[a-z]/, "Должна быть хотя бы одна строчная буква")
    // .regex(/[0-9]/, "Должна быть хотя бы одна цифра"),
})

type RegistryFormType = z.infer<typeof registrySchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegistryFormType>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      companyName: "",
      password: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: RegistryFormType) => {
    try {
      const res = await authApi.register(data)
      reset()
      setUser(res.user)
      navigate(`/dashboard/${res.user.role}`)
      toast.success(res.message)
    } catch (e) {
      if (e && typeof e === "object" && "response" in e) {
        const axiosError = e as any
        toast.error(
          axiosError.response?.data?.message ?? "Ошибка при регистрации"
        )
      }
    }
  }

  return (
    <div className="w-full flex">
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#3B82F6]/20 via-[#09090B] to-[#7C3AED]/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#7C3AED]/30 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#22C55E]/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
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
                {
                  icon: "⚡",
                  title: "Instant Setup",
                  description: "Get started in under 5 minutes",
                },
                {
                  icon: "🔒",
                  title: "Enterprise Security",
                  description: "Bank-level encryption & compliance",
                },
                {
                  icon: "📊",
                  title: "Real-time Analytics",
                  description: "Track everything that matters",
                },
                {
                  icon: "🌍",
                  title: "Global Coverage",
                  description: "Operations in 150+ countries",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <div className="font-semibold text-white mb-1">
                      {feature.title}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center min-h-screen w-1/2">
        <div className="flex flex-col items-start w-7/10 pt-10">
          <Logo />

          <div className="flex flex-col gap-4 mt-5">
            <span className="text-white text-4xl">Create account</span>
            <span className="text-zinc-400 text-xl">
              Start your 14-day free trial today
            </span>
          </div>

          <div className="mt-10 flex flex-wrap w-full flex-col gap-5">
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full gap-5">
                <Input
                  label="First name"
                  icon={User}
                  placeholder="Matvei"
                  error={errors.name?.message}
                  {...register("name")}
                  containerClassName="w-1/2"
                />
                <Input
                  label="Last name"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  {...register("lastName")}
                  containerClassName="w-1/2"
                />
              </div>

              <Input
                label="Email"
                icon={Mail}
                placeholder="email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Company name"
                icon={Building}
                placeholder="Acme Inc."
                error={errors.companyName?.message}
                {...register("companyName")}
              />

              <Input
                label="Password"
                icon={Lock}
                placeholder="Create a strong password"
                type="password"
                error={errors.password?.message}
                {...register("password")}
              />

              <div>
                <label className="block text-sm text-zinc-300 mb-2 ml-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-[#7C3AED] focus:ring-[#7C3AED]/50"
                  />
                  <span className="pl-2">I agree to the </span>
                  <a href="#" className="text-purple-500 hover:underline">
                    Terms of Service
                  </a>
                  <span> and </span>
                  <a href="#" className="text-purple-500 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="relative mt-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#09090B] text-zinc-500">
                  or sign up with
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="p-3 cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl">
                <img src={`${github}`} className="w-5 h-5" />
              </button>
              <AuthGoogle />
            </div>

            <div className="w-full flex justify-center mb-10">
              <span className="text-zinc-400">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-500">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
