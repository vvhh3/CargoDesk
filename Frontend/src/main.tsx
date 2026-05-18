import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { ThemeProvider } from "./Components/theme/ThemeProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
