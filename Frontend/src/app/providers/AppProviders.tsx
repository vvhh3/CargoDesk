import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "./ThemeProvider"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GoogleOAuthProvider
          clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              success: {
                style: { background: "#22c55e", color: "#fff" },
                iconTheme: { primary: "#fff", secondary: "#22c55e" },
              },
              error: {
                style: { background: "#ef4444", color: "#fff" },
                iconTheme: { primary: "#fff", secondary: "#ef4444" },
              },
            }}
          />
          {children}
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
